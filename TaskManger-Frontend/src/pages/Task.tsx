import { useState } from "react";
import Navbar from "../components/navbar";

const Task = () => {
  const [tasks, setTasks] = useState([
    { id: "T-00001", title: "Buy clothes", priority: 5, status: "Pending", startTime: "26-Nov-24 11:00 AM", endTime: "30-Nov-24 11:00 AM", totalTime: 96 },
    { id: "T-00002", title: "Finish code", priority: 2, status: "Finished", startTime: "25-Nov-24 09:05 AM", endTime: "25-Nov-24 03:15 PM", totalTime: 6.17 },
    { id: "T-00003", title: "Book travel tickets", priority: 4, status: "Pending", startTime: "19-Nov-24 10:00 PM", endTime: "20-Nov-24 10:00 PM", totalTime: 25 },
    { id: "T-00004", title: "Order groceries", priority: 3, status: "Finished", startTime: "14-Oct-24 10:30 AM", endTime: "16-Oct-24 10:30 PM", totalTime: 60 },
    { id: "T-00005", title: "Medical checkup", priority: 1, status: "Pending", startTime: "19-Nov-24 01:15 PM", endTime: "21-Dec-24 05:00 PM", totalTime: 51.75 },
  ]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((taskId) => taskId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !selectedTasks.includes(task.id)));
    setSelectedTasks([]); // Clear the selection after deletion
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Background Gradient */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Navbar */}
      <Navbar />

      {/* Task List */}
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Task List</h1>
        <div className="flex justify-between mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">+ Add Task</button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDeleteSelected}
            disabled={selectedTasks.length === 0}
          >
            Delete Selected
          </button>
        </div>
        <table className="table-auto w-full border-collapse border border-gray-700 text-sm">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2">Select</th>
              <th className="border border-gray-700 px-4 py-2">Task ID</th>
              <th className="border border-gray-700 px-4 py-2">Title</th>
              <th className="border border-gray-700 px-4 py-2">Priority</th>
              <th className="border border-gray-700 px-4 py-2">Status</th>
              <th className="border border-gray-700 px-4 py-2">Start Time</th>
              <th className="border border-gray-700 px-4 py-2">End Time</th>
              <th className="border border-gray-700 px-4 py-2">Total Time (hrs)</th>
              <th className="border border-gray-700 px-4 py-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-700">
                <td className="border border-gray-700 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleCheckboxChange(task.id)}
                    className="form-checkbox text-blue-500"
                  />
                </td>
                <td className="border border-gray-700 px-4 py-2">{task.id}</td>
                <td className="border border-gray-700 px-4 py-2">{task.title}</td>
                <td className="border border-gray-700 px-4 py-2">{task.priority}</td>
                <td
                  className={`border border-gray-700 px-4 py-2 ${
                    task.status === "Finished" ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {task.status}
                </td>
                <td className="border border-gray-700 px-4 py-2">{task.startTime}</td>
                <td className="border border-gray-700 px-4 py-2">{task.endTime}</td>
                <td className="border border-gray-700 px-4 py-2">{task.totalTime}</td>
                <td className="border border-gray-700 px-4 py-2">
                  <button className="text-blue-400 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
