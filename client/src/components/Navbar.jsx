import { Link } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-blue-700 font-bold text-xl">
          <div className="w-8 h-8 bg-blue-700 rounded text-white flex items-center justify-center text-sm">JB</div>
          JobBoard
        </Link>
        <div className="flex items-center gap-5">
          {user ? (
            <>
              {user.role === 'recruiter' && (
                <Link to="/post-job" className="text-gray-700 hover:text-blue-700 font-medium text-sm">
                  Post a Job
                </Link>
              )}
              <span className="text-gray-600 text-sm">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-sm font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-700 font-medium text-sm">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded-full text-sm font-medium transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;