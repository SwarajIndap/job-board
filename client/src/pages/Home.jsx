import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition cursor-pointer"
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
              <p className="text-gray-400 text-xs mt-3">Posted by {job.user?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;