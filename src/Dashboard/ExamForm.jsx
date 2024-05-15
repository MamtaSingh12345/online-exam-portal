import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/ExamForm.css';

const ExamForm = () => {
    const location = useLocation();
    const [title, setTitle] = useState(location.state ? location.state.title : '');
    const [questionType, setQuestionType] = useState('');
    const [showMCQForm, setShowMCQForm] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        options: ['', ''],
        correctAnswer: '',
        answerDescription: ''
    });

    const handleQuestionTypeChange = (event) => {
        setQuestionType(event.target.value);
        setShowMCQForm(event.target.value === 'MCQ');
    };

    const handleOptionChange = (index, event) => {
        const { value } = event.target;
        if (value.length <= 150) { 
            const updatedOptions = [...currentQuestion.options];
            updatedOptions[index] = value;
            setCurrentQuestion({
                ...currentQuestion,
                options: updatedOptions
            });
        }
    };
    
    const handleAddOption = () => {
        setCurrentQuestion({
            ...currentQuestion,
            options: [...currentQuestion.options, '']
        });
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = currentQuestion.options.filter((_, optionIndex) => optionIndex !== index);
        setCurrentQuestion({
            ...currentQuestion,
            options: updatedOptions
        });
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            question: '',
            options: ['', ''],
            correctAnswer: '',
            answerDescription: ''
        });
    };

    const handleSubmitAllQuestions = () => {
        console.log(questions);
    };

    return (
        <div className="container px-4">
            <div className="row gx-5" style={{ height: '200px' }}>
                <div className="col">
                    <div className="p-3 border bg-light">
                        <h2 className="Exam-form">Exam Form</h2>
                        <p>Title: {title}</p>
                        <form>
                            <div className="form-group">
                                <label htmlFor="questionType">Question Type:</label>
                                <select
                                    className="form-select"
                                    id="questionType"
                                    name="questionType"
                                    value={questionType}
                                    onChange={handleQuestionTypeChange}
                                >
                                    <option value="">Select Question Type</option>
                                    <option value="MCQ">Multiple Choice Questions</option>
                                    <option value="Subjective">Subjective</option>
                                </select>
                            </div>
                        </form>
                        {showMCQForm && (
                            <div className="container-mcq px-4">
                                <div className="row gx-5">
                                    <div className="col-mcq col-md-8 col-lg-8">
                                        <h3 className="Add-MCQ">Add MCQ Question</h3>
                                        <div className="form-group">
                                            <label htmlFor="question">Question:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="question"
                                                name="question"
                                                value={currentQuestion.question}
                                                onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                                            />
                                        </div>
                                        <h4>Options:</h4>
                                        {currentQuestion.options.map((option, index) => (
                                            <div key={index} className="form-group">
                                                <label htmlFor={`option${index + 1}`}>Option {index + 1}:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id={`option${index + 1}`}
                                                    name={`option${index + 1}`}
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e)}
                                                />
                                                {index >= 2 && (
                                                    <button type="button" className="btn btn-danger mt-3 w-25 float-right " onClick={() => handleRemoveOption(index)}>Remove</button>
                                                )}
                                            </div>
                                        ))}
                                        <div className="form-group">
                                            <label htmlFor="correctAnswer">Correct Answer:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="correctAnswer"
                                                name="correctAnswer"
                                                value={currentQuestion.correctAnswer}
                                                onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="answerDescription">Answer Description:</label>
                                            <textarea
                                                className="form-control"
                                                id="answerDescription"
                                                name="answerDescription"
                                                value={currentQuestion.answerDescription}
                                                onChange={(e) => setCurrentQuestion({ ...currentQuestion, answerDescription: e.target.value })}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                         <button type="button" className="btn btn-primary mt-3 w-25" onClick={handleAddOption}>Add Option</button>
                                         <button type="button" className="btn btn-primary mt-3 w-25" onClick={handleAddQuestion}>Submit Question</button>
                                        </div>
                                    </div>
                                    <div className="px-4 col-md-4 col-lg-4">
                                        <div className="p-3 border bg-light">
                                            <h3 className="import">Import Questions from File</h3>
                                            <div className="form-group">
                                                <input type="file" className="form-control-file" accept=".txt" />
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {questions.length > 0 && ( 
                        <button type="button" className="btn btn-primary mt-2 d-block mx-auto" onClick={handleSubmitAllQuestions}>Submit Questions Paper</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamForm;
