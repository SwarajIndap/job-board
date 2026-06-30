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
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Post a new job</h2>
        <p className="text-gray-500 text-sm mb-6">Reach thousands of job seekers</p>

        {error && (
          <p className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="title" placeholder="Job Title" onChange={handleChange} required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="company" placeholder="Company Name" onChange={handleChange} required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="location" placeholder="Location" onChange={handleChange} required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            name="description" placeholder="Job Description" rows="4" onChange={handleChange} required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="salary" placeholder="Salary (optional)" onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg text-sm font-medium transition mt-2"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJob;