import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import companyLogo from '../Assets/logo.png';
import Sidebar from './SideBar'; 
import CreateExam from './CreateExam';
import ExamForm from './ExamForm';
import '../css/Navigation.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light custom-navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={companyLogo} alt="Company Logo" height="30" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item text-white">
                Dashboard
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Navigation = () => {
  const [showExamForm, setShowExamForm] = useState(false);

  const handleStartExam = () => {
    setShowExamForm(true);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar /> 
          </div>
          <div className="col-md-10">
            {showExamForm ? <ExamForm /> : <CreateExam onStartExam={handleStartExam} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
