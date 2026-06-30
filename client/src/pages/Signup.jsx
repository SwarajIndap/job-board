import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'seeker' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('https://job-board-ryd4.onrender.com/api/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
        <p className="text-gray-500 text-sm mb-6">Join JobBoard to find jobs or hire talent</p>

        {error && (
          <p className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name" placeholder="Full Name" onChange={handleChange} required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="email" type="email" placeholder="Email" onChange={handleChange} required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="password" type="password" placeholder="Password" onChange={handleChange} required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            name="role" onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="seeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg text-sm font-medium transition mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-5 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;