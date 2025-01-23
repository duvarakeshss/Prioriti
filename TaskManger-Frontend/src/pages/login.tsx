import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage
        localStorage.setItem('authToken', data.token);

        // Redirect to dashboard on successful login
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-12 py-3 text-white bg-transparent rounded-lg border border-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-12 py-3 text-white bg-transparent rounded-lg border border-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-blue-700 bg-white rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition duration-300 hover:text-white"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-white">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-300 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
