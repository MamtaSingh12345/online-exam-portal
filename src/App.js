import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import HomePage from './HomePage';
import Login from './Login';
import About from './Components/About';
import Register from './UserAuth/Register';
import NavigationBar from './Dashboard/NavigationBar'; 
import CreateExam from './Dashboard/CreateExam'; 
import ExamForm from './Dashboard/ExamForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/about" element={<About />} />
          <Route path="/NavigationBar" element={<NavigationBar />} /> 
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/exam-form" element={<ExamForm/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
