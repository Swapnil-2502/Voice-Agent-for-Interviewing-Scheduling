import React from 'react'
import CandidateForm from '../Components/CandidateForm'

const Home = () => {
  return (
    <>  
        <div className="p-4">
            <h1 className='font-bold text-3xl text-center mb-10 mt-20'>Welcome to Interview Scheduler</h1>
            <CandidateForm />
        </div>
       
    </>
  )
}

export default Home