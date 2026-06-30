import { Link } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#1e1e2f', color: 'white' }}>
      <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', textDecoration: 'none' }}>
        JobBoard
      </Link>
      <div style={{ display: 'flex', gap: '20px' }}>
       {user ? (
  <>
    {user.role === 'recruiter' && <Link to="/post-job" style={{ color: 'white' }}>Post Job</Link>}
    <span>Hi, {user.name}</span>
    <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
  </>
) : (
          <>
            <Link to="/login" style={{ color: 'white' }}>Login</Link>
            <Link to="/signup" style={{ color: 'white' }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;