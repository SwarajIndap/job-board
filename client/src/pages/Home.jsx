import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto', padding: '20px' }}>
      <h2>Available Jobs</h2>
      {jobs.length === 0 && <p>No jobs posted yet.</p>}
      {jobs.map((job) => (
        <div key={job.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
          <h3>{job.title}</h3>
          <p><strong>{job.company}</strong> — {job.location}</p>
          <p>{job.description}</p>
          {job.salary && <p>💰 {job.salary}</p>}
          <p style={{ fontSize: '12px', color: 'gray' }}>Posted by {job.user?.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;