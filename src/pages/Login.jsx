import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/login', form);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="mn-page">
      <div className="mn-side">
        <h1 className="mn-side-headline">Welcome back.</h1>
        <p className="mn-side-text">Log in to pick up right where you left off.</p>
      </div>
      <div className="mn-form-side">
        <div className="mn-form-wrap">
          <h2 className="mn-form-title">Log in</h2>
          <form className="mn-form" onSubmit={handleSubmit}>
            <div className="mn-field">
              <label className="mn-label">Username</label>
              <input
                className="mn-input"
                name="name"
                placeholder="Enter your username"
                value={form.name}
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
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="mn-error">{error}</div>}
            <button className="mn-button" type="submit">
              Log in
            </button>
          </form>
          <p className="mn-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}