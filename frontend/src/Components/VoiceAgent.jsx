import { useEffect, useState } from "react";
import * as chrono from 'chrono-node';

const questions = [
  "Are you interested in this role?",
  "What is your current notice period?",
  "Can you share your current and expected CTC?",
  "When are you available for an interview next week?"
];

const VoiceAgent = () => {
  const [listening, setListening] = useState(false);
  const [queNum, setqueNum] = useState(0);
  const [log, setlog] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [display , setDisplay] = useState(false);

  const name = sessionStorage.getItem("candidateName") || "Candidate";

  const speak = (text, cb) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.3;
    utterance.onend = cb;
    window.speechSynthesis.speak(utterance);
  };

  const listen = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition)
      return alert("Speech recognition not supported in this browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    const startTime = Date.now();

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      const elapsed = Date.now() - startTime;
      const waitTime = 10000 - elapsed;

      // Log answer immediately
      setAnswers((prev) => [...prev, result]);
      setlog((prev) => [
        ...prev,
        { question: questions[queNum], answer: result }
      ]);

      // Delay question transition to complete 10 seconds total
      setTimeout(() => {
        const next = queNum + 1;
        if (next < questions.length) {
          setqueNum(next);
        } else {
            setDisplay(true)
            speak("Thanks for your responses. We’ll get back to you shortly.");
            submitBackend()
        }
      }, waitTime > 0 ? waitTime : 0);
    };

    recognition.start();
  };

  const startInterview = () => {
    setStarted(true);
  };

  useEffect(() => {
    if (!started) return;

    if (queNum === 0 && answers.length === 0) {
      speak(
        `Hello ${name}, this is Personalize AI regarding a Frontend Engineer job opportunity.`,
        () => {
            setTimeout(()=>{
                setCurrentQuestion(questions[queNum]);
                speak(questions[queNum], () => listen());
            },2000)
          
        }
      );
    } else if (queNum < questions.length && answers.length === queNum) {
      setCurrentQuestion(questions[queNum]);
      speak(questions[queNum], () => listen());
    }
  }, [queNum, started]);

    const extractedentities = (answers) => {
        const current_ctc_match = answers[2]?.match(/current CTC is (\d+)/i);
        const expected_ctc_match = answers[2]?.match(/expected CTC is (\d+)/i);
        const notice_period_match = answers[1]?.match(/(\d+\s*(day|days|month|months))/i);
        
        let raw_datetime = answers[3] || "";
        raw_datetime = raw_datetime
            .replace(/next week's\s*/i, "next ")  
            .replace(/time\s*/i, "")        
            .trim();

        const parsedDate = chrono.parseDate(raw_datetime);

        let formatted_datetime = null;
        if (parsedDate instanceof Date && !isNaN(parsedDate)) {
            formatted_datetime = parsedDate.toISOString().slice(0, 19).replace("T", " ");
        }


        return {
            current_ctc: current_ctc_match ? Number(current_ctc_match[1]) : null,
            expected_ctc: expected_ctc_match ? Number(expected_ctc_match[1]) : null,
            notice_period: notice_period_match ? notice_period_match[1] : null,
            appointment_datetime: formatted_datetime
        };
    }

    const submitBackend = async () => {
        const name = sessionStorage.getItem('candidateName')
        const phone = sessionStorage.getItem('candidatePhone')
        const experience = sessionStorage.getItem('experience')

        const extracted = extractedentities(answers);
        console.log(name,phone,experience)
        console.log(extracted)

        const candidateResult = await fetch("http://localhost:3002/api/candidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            name,
            phone,
            current_ctc: extracted.current_ctc,
            expected_ctc: extracted.expected_ctc,
            notice_period: extracted.notice_period,
            experience,
            }),
        });

        const candidateData = await candidateResult.json();
        const candidateId = candidateData.candidateId;

        await fetch("http://localhost:3002/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            job_id: 1,
            candidate_id: candidateId,
            date_time: extracted.appointment_datetime,
            }),
        });
        console.log(log)
        await fetch("http://localhost:3002/api/conversations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            candidate_id: candidateId,
            transcript: JSON.stringify(log),
            entities_extracted: JSON.stringify(extracted),
            }),
        });
    }



  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4 mt-20">
      <h2 className="text-2xl font-bold">AI Voice Agent</h2>
      <p className="text-gray-600">Talking to: {name}</p>

      {!started && (
        <button
          onClick={startInterview}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Start Interview
        </button>
      )}

      {started && (
        <>
          <div className="p-4 bg-yellow-100 text-yellow-800 font-medium rounded shadow">
            <p>🔈 Current Question: {currentQuestion}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h4 className="font-semibold">Conversation Log:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {log.map((entry, idx) => (
                <li key={idx}>
                  <strong>Q:</strong> {entry.question}
                  <br />
                  <strong>A:</strong> {entry.answer}
                </li>
              ))}
            </ul>
          </div>
            {!display ? (
                <p className="text-blue-600 font-semibold">
                    {listening ? "🎙️ Listening..." : "🔈 Speaking..."}
                </p>
                ) : (
                <p className="text-green-600 font-semibold">✅ Thank you for your time.</p>
            )}
        </>
      )}
    </div>
  );
};


export default VoiceAgent;
