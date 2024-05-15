import React from 'react';

const ExamDetailsTable = ({ examDetails }) => {
    const { dateCreated, examName, questions, attempts } = examDetails;

    
    const totalQuestions = questions ? questions.length : 0;

    return (
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
                    <td>{dateCreated}</td>
                    <td>{examName}</td>
                    <td>{totalQuestions}</td> 
                    <td>{attempts}</td>
                    <td>
                        
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ExamDetailsTable;
