import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
import '../css/ExamCreation.css';
import NavigationBar from './NavigationBar';
const CreateExam = ({ onStartExam }) =>{
    const [showTitleModal, setShowTitleModal] = useState(false);
    // const navigate = useNavigate(); 

    
    const handleStart = () => {
        onStartExam(); 
        setShowTitleModal(false);
      };

    const handleTitleSubmit = (title) => {
       
        handleStart();
    };

    return (
        <div className="overview-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="overview">Overview</h2>
                <button className="btn btn-primary" onClick={() => setShowTitleModal(true)}>
                    Create new exam
                </button>
            </div>
            <EmptyExamDetailsTable />
            {showTitleModal && (
                <ExamTitleModal
                    handleTitleSubmit={handleTitleSubmit}
                    setShowTitleModal={setShowTitleModal}
                />
            )}
        </div>
    );
};

const EmptyExamDetailsTable = () => {
    
    return (
        <>
        <table className="table mt-3">
            <thead>
                <tr>
                    <th>Date Created</th>
                    <th>Exam Title</th>
                    <th>Questions</th>
                    <th>Attempts</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>No exam created yet</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        </>
    );
};

const ExamTitleModal = ({ handleTitleSubmit, setShowTitleModal }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleTitleSubmit(title);
        setShowTitleModal(false);
    };

    return (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Enter Exam Title</h5>
                        <button type="button" className="btn-close" onClick={() => setShowTitleModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="examTitle" className="form-label">Title:</label>
                                <input type="text" className="form-control" id="examTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Get Started</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateExam;
