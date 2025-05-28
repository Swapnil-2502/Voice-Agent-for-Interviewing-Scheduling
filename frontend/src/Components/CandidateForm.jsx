import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CandidateForm = () => {
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const navigate = useNavigate();

    const handlesubmit = (e) =>{
        e.preventDefault();

        if (!name.trim() || !phone.trim()) {
            alert('Please enter your name and phone number.');
            return;
        }

        sessionStorage.setItem('candidateName', name);
        sessionStorage.setItem('candidatePhone', phone);
        
        navigate('/agent')
    }

  return (
    <form onSubmit={handlesubmit}className="space-y-4 max-w-md mx-auto" >
        <div>
            <label className="block font-medium">Name</label>
            <input type="text" 
            placeholder="Enter your name" 
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
        </div>
        <div>
            <label className="block font-medium">Phone Number</label>
            <input type="text" 
            placeholder="Enter your name" 
            className="border p-2 w-full rounded"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            />
        </div>

        <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Start Interview
        </button>

    </form>
  )
}

export default CandidateForm