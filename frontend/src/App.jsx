import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Agent from './Pages/Agent';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/agent' element={<Agent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App