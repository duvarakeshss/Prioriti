import { useNavigate } from 'react-router-dom';

const navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  const handleSignoutClick = () => {
    navigate('/');
  };

  const handleTaskClick = () => {
    navigate('/task');
  }

  return (
    <div className="fixed top-0 z-[10] w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
    <div className="flex justify-between items-center bg-white bg-opacity-5 backdrop-blur-lg p-3 w-full">
        {/* Center Section */}
        <div className="flex justify-center items-center w-full">
          <button
            onClick={handleHomeClick}
            className="ml-4 font-sans text-white hover:underline hover:text-green-600 p-2 text-xl"
          >
            Home
          </button>
          <button
          onClick={handleTaskClick}
            className="ml-4 font-sans text-white hover:underline hover:text-green-600 p-2 text-xl"
          >
            Task
          </button>
        </div>

        {/* Right Section */}
        <div>
          <button
            onClick={handleSignoutClick}
            className="mr-4 font-sans text-white hover:underline hover:text-green-600 p-2 text-xl"
          >
            Signout
          </button>
        </div>
      </div>
    </div>
  );
};

export default navbar;
