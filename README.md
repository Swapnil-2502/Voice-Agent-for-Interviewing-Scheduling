# 🎙️ Voice Agent for Interview Scheduling

An AI-powered voice assistant web app that collects candidate information via voice interactions, extracts structured data using NLP, and schedules interviews automatically. Built with React, Node.js, MySQL.

---

## Demo Video link

- Video Link
    ```bash
        https://drive.google.com/file/d/1_MdqMui78Y8MEuh2OjRAYebuUuJ2Paok/view?usp=sharing
    ```

---
## 📌 Features

Note: This is actually a simulation of a call, right now I am using a form to collect name,phone and experience (assuming we already have these fields as we are calling a candidate). And other fields like current_ctc, expected_ctc and notice_period using Regex.

- ✅ Candidate form with name and phone number input
- 🎤 AI voice agent for collecting further candidate details (CTC, notice period, availability)
- 🧠 Regex for extraction from natural language responses
- 🗓️ Automatic interview appointment scheduling
- 💾 Data persistence with MySQL (Candidates, Conversations, Appointments, Jobs)
- 📡 Backend APIs for storing and retrieving structured data

- To start the backend server
    ```bash
        cd backend
        npm install
        npm run dev
    ```

- To start Frontend server
    ```bash
        cd frontend
        npm install
        npm run dev
    ```

Make sure backend is running at http://localhost:3002.
And frontend is running at http://localhost:5173.

## 🔧API Endpoints:
Jobs
    POST /api/jobs
    Create a new Job

    GET  /api/jobs
    List all Jobs

Candidate
    POST /api/candidate
    Create a new candidate

    GET /api/candidate
    List all candidates

Appointments
    POST /api/appointment
    Create a new appointment

    GET /api/appointments
    Get all appointments

    GET /api/appointments/job/:jobID
    Get all appointments wrt a job

    GET /api/appointments/candidate/:candidateID
    Get all appointments wrt a candidate

Conversations
    POST /api/conversation
    Save transcript + extracted entities

    GET /api/conversations/:candidateID
    Get transcript + extracted entities wrt to a candidate

### 💾Connect to your local MySQL

- Create .env file in your backend
    ```bash
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=yourpassword
        DB_NAME=interview_scheduler
        PORT=3002
    ```

    Replace all these with your credentials. Query for database and table creating is on backend/README.md
