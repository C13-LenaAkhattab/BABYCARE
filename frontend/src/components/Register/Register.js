import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { AppContext } from '../../App';

const Register = () => {
  const {TokenState, setTokenState}=useContext(AppContext)
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [userForm, setUserForm] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [babyForm, setBabyForm] = useState({
    firstName: '',
    ageInMonths: ''
  });

  const handleUserFormChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleBabyFormChange = (e) => {
    setBabyForm({
      ...babyForm,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateUserForm = () => {
    if (!userForm.firstName || !userForm.email || !userForm.password || !userForm.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (userForm.password !== userForm.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (userForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(userForm.email)) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const validateBabyForm = () => {
    if (!babyForm.firstName || !babyForm.ageInMonths) {
      setError('All fields are required');
      return false;
    }
    if (isNaN(babyForm.ageInMonths) || babyForm.ageInMonths < 0 || babyForm.ageInMonths > 36) {
      setError('Please enter a valid age (0-36 months)');
      return false;
    }
    return true;
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    
    if (!validateUserForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        firstName: userForm.firstName,
        email: userForm.email,
        password: userForm.password
      });

      if (response.data.success) {
        localStorage.setItem('Token', response.data.token);
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBabyRegistration = async (e) => {
    e.preventDefault();
    
    if (!validateBabyForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.post(
        'http://localhost:5000/baby',
        {
          firstName: babyForm.firstName,
          ageInMonths: parseInt(babyForm.ageInMonths)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        navigate('/Home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add baby information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {step === 1 ? (
        <div className="register-form-container">
          <h2>Create Your Account</h2>
          <form onSubmit={handleUserRegistration} className="register-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userForm.firstName}
                onChange={handleUserFormChange}
                placeholder="Enter your first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userForm.email}
                onChange={handleUserFormChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userForm.password}
                onChange={handleUserFormChange}
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={userForm.confirmPassword}
                onChange={handleUserFormChange}
                placeholder="Confirm your password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Next'}
            </button>
          </form>
        </div>
      ) : (
        <div className="register-form-container">
          <h2>Add Your Baby's Information</h2>
          <form onSubmit={handleBabyRegistration} className="register-form">
            <div className="form-group">
              <label htmlFor="babyFirstName">Baby's Name</label>
              <input
                type="text"
                id="babyFirstName"
                name="firstName"
                value={babyForm.firstName}
                onChange={handleBabyFormChange}
                placeholder="Enter baby's first name"
              />
            </div>
            <div className="progress-indicator">
  <div className={`step ${step === 1 ? 'active' : ''}`}></div>
  <div className={`step ${step === 2 ? 'active' : ''}`}></div>
</div>

            <div className="form-group">
              <label htmlFor="ageInMonths">Age in Months</label>
              <input
                type="number"
                id="ageInMonths"
                name="ageInMonths"
                value={babyForm.ageInMonths}
                onChange={handleBabyFormChange}
                placeholder="Enter baby's age in months"
                min="0"
                max="36"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Adding Baby Info...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;