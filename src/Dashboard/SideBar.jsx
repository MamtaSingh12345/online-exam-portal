
import React from 'react';
import '../css/Navigation.css';

const Sidebar = () => {
  return (
    <nav className="d-md-block sidebar-light coustom sidebar">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="/academies" className="nav-link" aria-current="page">
              <i className="bi bi-speedometer2 me-2" />
              Academies
            </a>
          </li>
          <li className="nav-item">
            <a href="/courses" className="nav-link">
              <i className="bi bi-book me-2" />
              Courses
            </a>
          </li>
          <li className="nav-item">
            <a href="/exams" className="nav-link">
              <i className="bi bi-file-earmark-text me-2" />
              Exams
            </a>
          </li>
          <li className="nav-item">
            <a href="/manage" className="nav-link">
              <i className="bi bi-people me-2" />
              Manage participants
            </a>
          </li>
          <li className="nav-item">
            <a href="/email-status-log" className="nav-link">
              <i className="bi bi-envelope me-2" />
              Email status log
            </a>
          </li>
          <li className="nav-item">
            <a href="/analyze" className="nav-link">
              <i className="bi bi-bar-chart-fill me-2" />
              Analyze
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
