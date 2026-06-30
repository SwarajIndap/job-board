import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostJob() {
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', description: '', salary: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/jobs', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h2>Post a New Job</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="title" placeholder="Job Title" onChange={handleChange} required />
        <input name="company" placeholder="Company Name" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" rows="4" onChange={handleChange} required />
        <input name="salary" placeholder="Salary (optional)" onChange={handleChange} />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;