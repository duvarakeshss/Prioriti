import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const baseUrl = import.meta.env.VITE_SERVER_URL;

const Register = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${baseUrl}/api/auth/user/register`, {
        userName,
        password,
      });

      if (response.data.success) {
        navigate('/');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || 'Registration failed. Please try again.';
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error('Unexpected error:', err);
      }
    }
  };


  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Register</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-12 py-3 text-white bg-transparent rounded-lg border border-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-12 py-3 text-white bg-transparent rounded-lg border border-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-blue-700 bg-white rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition duration-300 hover:text-white"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-white">
            Already have an account?{' '}
            <Link to="/" className="text-blue-300 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
