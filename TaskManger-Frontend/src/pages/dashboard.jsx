import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <Navbar />
      <div className="p-16">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mt-4">Dashboard</h1>

        {/* Summary Section */}
        <div className="grid grid-cols-4 gap-4 mb-8 text-center">
          <div>
            <h2 className="text-5xl font-bold text-indigo-600">25</h2>
            <p className="text-white">Total tasks</p>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-indigo-600">40%</h2>
            <p className="text-white">Tasks completed</p>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-indigo-600">60%</h2>
            <p className="text-white">Tasks pending</p>
          </div>
          <div>
            <h2 className="text-5xl font-bold text-indigo-600">3.5 hrs</h2>
            <p className="text-white">Avg. time per completed task</p>
          </div>
        </div>

        {/* Pending Task Summary */}
        <h2 className="text-2xl font-bold text-white mb-4">Pending Task Summary</h2>
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div>
            <h3 className="text-4xl font-bold text-indigo-600">15</h3>
            <p className="text-white">Pending tasks</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-indigo-600">56 hrs</h3>
            <p className="text-white">Total time lapsed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-indigo-600">24 hrs</h3>
            <p className="text-white">Time to finish</p>
          </div>
        </div>

        {/* Task Priority Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-500">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Task Priority</th>
              <th className="border border-gray-300 px-4 py-2">Pending Tasks</th>
              <th className="border border-gray-300 px-4 py-2">Time Lapsed (hrs)</th>
              <th className="border border-gray-300 px-4 py-2">Time to Finish (hrs)</th>
            </tr>
          </thead>
          <tbody className="text-white">
            <tr className="hover:bg-gray-700">
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">3</td>
              <td className="border border-gray-300 px-4 py-2">12</td>
              <td className="border border-gray-300 px-4 py-2">8</td>
            </tr>
            <tr className="hover:bg-gray-700">
              <td className="border border-gray-300 px-4 py-2">2</td>
              <td className="border border-gray-300 px-4 py-2">5</td>
              <td className="border border-gray-300 px-4 py-2">6</td>
              <td className="border border-gray-300 px-4 py-2">3</td>
            </tr>
            <tr className="hover:bg-gray-700">
              <td className="border border-gray-300 px-4 py-2">3</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">8</td>
              <td className="border border-gray-300 px-4 py-2">7</td>
            </tr>
            <tr className="hover:bg-gray-700">
              <td className="border border-gray-300 px-4 py-2">4</td>
              <td className="border border-gray-300 px-4 py-2">0</td>
              <td className="border border-gray-300 px-4 py-2">0</td>
              <td className="border border-gray-300 px-4 py-2">0</td>
            </tr>
            <tr className="hover:bg-gray-700">
              <td className="border border-gray-300 px-4 py-2">5</td>
              <td className="border border-gray-300 px-4 py-2">6</td>
              <td className="border border-gray-300 px-4 py-2">30</td>
              <td className="border border-gray-300 px-4 py-2">6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
