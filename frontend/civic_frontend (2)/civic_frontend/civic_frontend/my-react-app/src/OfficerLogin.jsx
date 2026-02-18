// frontend/src/pages/OfficerLogin.jsx
import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function OfficerLogin() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/officer/login/', { username, password });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('department', res.data.department);
      navigate('/officer/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data || err.message;
      alert(msg);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Officer Login</h3>
      <form onSubmit={handleLogin}>
        <input className="form-control my-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
        <input type="password" className="form-control my-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
