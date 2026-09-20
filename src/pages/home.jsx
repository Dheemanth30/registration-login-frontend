import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/me')
      .then((res) => setUser(res.data.user))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    await api.post('/logout');
    navigate('/login');
  };

  if (loading) return <div className="mn-loading">Loading...</div>;

  return (
    <div className="mn-dash-page">
      <div className="mn-dash-content">
        <h1 className="mn-dash-welcome">Welcome, {user?.name}</h1>
        <button className="mn-dash-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}