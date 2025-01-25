import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("https://todomanager-hnu2.onrender.com/api/auth/user/login", {
          userName,
          password,
        });
        if (response.data.success) {
          navigate('/dashboard');
        } else {
          setErrorMessage(response.data.message); // Display error message in the UI
        }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.'); // Handle error in the UI
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
              value={userName}
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

        {errorMessage && (
          <div className="mt-4 text-center text-red-500">{errorMessage}</div> // Display error message
        )}

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
