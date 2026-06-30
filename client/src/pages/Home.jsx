import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const fetchJobs = () => {
    axios.get('https://job-board-ryd4.onrender.com/api/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await axios.delete(`https://job-board-ryd4.onrender.com/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete job');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Find your next opportunity</h1>
        <p className="text-gray-500 mb-6">{jobs.length} jobs available</p>

        {loading && <p className="text-gray-400">Loading jobs...</p>}
        {!loading && jobs.length === 0 && (
          <p className="text-gray-400">No jobs posted yet. Check back soon!</p>
        )}

        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-blue-700 hover:underline">{job.title}</h3>
                  <p className="text-gray-700 font-medium mt-0.5">{job.company}</p>
                  <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                </div>
                {job.salary && (
                  <span className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                    {job.salary}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-3 line-clamp-2">{job.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-gray-400 text-xs">Posted by {job.user?.name}</p>
                {user && user.id === job.userId && (
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:text-red-700 text-xs font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;