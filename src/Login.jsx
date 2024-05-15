import React, { useState, useEffect } from 'react';
import './Login.css';
import md5 from 'md5';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header'; 
import OTPForm from './OTPForm'; 

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    setEmail(''); 
    setPassword(''); 
  }, []); 

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if email or password is empty or contains errors
    if (!email || !password || emailError || passwordError) {
      // Show error messages if fields are empty or contain errors
      setEmailError(email ? "" : "Email is required");
      setPasswordError(password ? "" : "Password is required");
      return;
    }

    setIsLoading(true);

    try {
      const LOGIN_API_URL = 'https://ejy88n4hr6.execute-api.us-east-1.amazonaws.com/auth/login';
      const loginData = {
        email: email,
        password: password,
      };

      const requestBody = JSON.stringify({ body: JSON.stringify(loginData) });

      const response = await axios.post(LOGIN_API_URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Login response:', {
        status: response.status,
        data: response.data,
      });

      // If login is successful, redirect to the dashboard
      if (response.status === 200) {
        // Use navigate instead of history.push
        setIsLoggedIn(true);
        navigate('/NavigationBar'); // Redirect to dashboard
      }

    } catch (error) {
      console.error('Login failed:', error);
    }
    setIsLoading(false);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    if (inputEmail === '') {
      // setEmail(localStorage.getItem('username') || '');
    }

    if (!EMAIL_REGEX.test(inputEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (!PASSWORD_REGEX.test(inputPassword)) {
      setPasswordError("Must be 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character: @$!%*?&");
    } else {
      setPasswordError("");
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem('username', email);
      localStorage.setItem('password', md5(password));
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  };

  const handleForgotPasswordSubmit = async (email) => {
    try {
      const FORGOT_PASSWORD_API_URL = 'https://ejy88n4hr6.execute-api.us-east-1.amazonaws.com/users/userforgetpassword';
      const requestBody = JSON.stringify({ body: JSON.stringify({ email, action: 'generate' }) });
      
      const response = await axios.post(FORGOT_PASSWORD_API_URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Forgot Password response:', response.data);
    } catch (error) {
      console.error('Forgot Password failed:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className='wrapper-login'>
        {showForgotPassword ? (
          <ForgotPasswordForm
            handlePrevious={() => setShowForgotPassword(false)}
            handleForgotPasswordSubmit={handleForgotPasswordSubmit}
            userEmail={email}
          />
        ) : (
          <form onSubmit={handleLogin}>
            <h2 className="login-title">LogIn</h2>
            {/* <div className="form-login"> */}
              <div className="input-field">
                <input
                  type="email"
                  id="email"
                  placeholder="User Id"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="off"
                />
              </div>
              {emailError && <p className="error-login">{emailError}</p>}
              <div className="input-field">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="off"
                />
                <span className="show-password-login" onClick={handleShowPasswordToggle}></span>
              </div>
              {passwordError && <p className="error-login">{passwordError}</p>}
            <div className="remember-forgot-login">
              <label>
                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                Remember Me
              </label>
              <button type="button"  onClick={handleForgotPasswordClick}>Forgot password?</button>
            </div>
            <br />
            <button type="submit" className="submit-login-button" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
            <div className="forget-password-login">
              To create a new account  <Link to="/register"> Click here</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const ForgotPasswordForm = ({ handleForgotPasswordSubmit, userEmail }) => {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Sending password reset email to:', email);

    try {
      await handleForgotPasswordSubmit(email);
      setAlertMessage('An email has been sent to reset your password. Please check your inbox.');
      setShowOTPForm(true);
    } catch (error) {
      console.error('Forgot Password failed:', error);
      setAlertMessage('Failed to send password reset email. Please try again later.');
    }

    setIsLoading(false);
    setTimeout(() => {
      setAlertMessage('');
    }, 4000);
  };

  const isEmailValid = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  return (
    <div>
      {showOTPForm ? (
        <OTPForm userEmail={email} />
      ) : (
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <h2 className="forget-title">Forgot Password</h2>
          <div className="forget-email">
          <input
            type="email"
            id="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <br />
          <button type="submit" className="submit-forget-button" disabled={isLoading || !isEmailValid()}>
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              "Verify Email"
            )}
          </button>

          {alertMessage && <p className="alert-message-login">{alertMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;
