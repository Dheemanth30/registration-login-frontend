import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/signup', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className="mn-page">
      <div className="mn-side">
        <h1 className="mn-side-headline">Get started.</h1>
        <p className="mn-side-text">Create an account in under a minute.</p>
      </div>
      <div className="mn-form-side">
        <div className="mn-form-wrap">
          <h2 className="mn-form-title">Create an account</h2>
          <form className="mn-form" onSubmit={handleSubmit}>
            <div className="mn-field">
              <label className="mn-label">Username</label>
              <input
                className="mn-input"
                name="name"
                placeholder="Choose a username"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mn-field">
              <label className="mn-label">Email</label>
              <input
                className="mn-input"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mn-field">
              <label className="mn-label">Phone number</label>
              <input
                className="mn-input"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mn-field">
              <label className="mn-label">Password</label>
              <input
                className="mn-input"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mn-field">
              <label className="mn-label">Confirm password</label>
              <input
                className="mn-input"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="mn-error">{error}</div>}
            <button className="mn-button" type="submit">
              Sign up
            </button>
          </form>
          <p className="mn-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}