import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import axios from "axios";

type Task = {
  id: string;
  title: string;
  priority: number;
  status: string;
  startTime: string;
  endTime: string;
  totalTime: number;
};

const Task = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [modalState, setModalState] = useState<"add" | "edit" | null>(null);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    priority: 1,
    status: "Pending",
    startTime: "",
    endTime: "",
    totalTime: 0,
  });

  const token = localStorage.getItem("authToken");

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("API did not return an array of tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        if (error.response && error.response.status === 401) {
          alert("Unauthorized: Please log in again.");
        }
      }
    };

    fetchTasks();
  }, [token]);

  const handleCheckboxChange = (id: string) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((taskId) => taskId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedTasks.length === 0) return;

    try {
      await axios.delete("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { ids: selectedTasks },
      });
      setTasks((prevTasks) =>
        prevTasks.filter((task) => !selectedTasks.includes(task.id))
      );
      setSelectedTasks([]);
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.startTime || !newTask.endTime) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setModalState(null);
      resetNewTask();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = async () => {
    if (!currentTask) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${currentTask.id}`,
        currentTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTask.id ? { ...task, ...response.data } : task
        )
      );
      setModalState(null);
      setCurrentTask(null);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const resetNewTask = () => {
    setNewTask({
      title: "",
      priority: 1,
      status: "Pending",
      startTime: "",
      endTime: "",
      totalTime: 0,
    });
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
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setModalState("add")}
          >
            + Add Task
          </button>
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
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.id || index} className="hover:bg-gray-700">
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
                  <td className="border border-gray-700 px-4 py-2">{task.status}</td>
                  <td className="border border-gray-700 px-4 py-2">{task.startTime}</td>
                  <td className="border border-gray-700 px-4 py-2">{task.endTime}</td>
                  <td className="border border-gray-700 px-4 py-2">{task.totalTime}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    <button
                      className="text-blue-400 hover:underline"
                      onClick={() => {
                        setCurrentTask(task);
                        setModalState("edit");
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center text-gray-500">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Task Modal */}
      {modalState && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {modalState === "add" ? "Add New Task" : "Edit Task"}
            </h2>
            <input
              type="text"
              className="w-full p-2 mb-4 border text-black"
              placeholder="Task Title"
              value={modalState === "add" ? newTask.title : currentTask?.title || ""}
              onChange={(e) =>
                modalState === "add"
                  ? setNewTask({ ...newTask, title: e.target.value })
                  : setCurrentTask({ ...currentTask!, title: e.target.value })
              }
            />
            <input
              type="number"
              className="w-full p-2 mb-4 border text-black"
              placeholder="Priority (1-5)"
              value={modalState === "add" ? newTask.priority : currentTask?.priority || 1}
              onChange={(e) =>
                modalState === "add"
                  ? setNewTask({ ...newTask, priority: Math.min(5, Math.max(1, +e.target.value)) })
                  : setCurrentTask({ ...currentTask!, priority: Math.min(5, Math.max(1, +e.target.value)) })
              }
            />
            <input
              type="datetime-local"
              className="w-full p-2 mb-4 border text-black"
              value={modalState === "add" ? newTask.startTime : currentTask?.startTime || ""}
              onChange={(e) =>
                modalState === "add"
                  ? setNewTask({ ...newTask, startTime: e.target.value })
                  : setCurrentTask({ ...currentTask!, startTime: e.target.value })
              }
            />
            <input
              type="datetime-local"
              className="w-full p-2 mb-4 border text-black"
              value={modalState === "add" ? newTask.endTime : currentTask?.endTime || ""}
              onChange={(e) =>
                modalState === "add"
                  ? setNewTask({ ...newTask, endTime: e.target.value })
                  : setCurrentTask({ ...currentTask!, endTime: e.target.value })
              }
            />
            <button
              className="w-full bg-blue-500 text-white py-2 rounded mb-4"
              onClick={modalState === "add" ? handleAddTask : handleEditTask}
            >
              {modalState === "add" ? "Add Task" : "Save Changes"}
            </button>
            <button
              className="w-full bg-gray-500 text-white py-2 rounded"
              onClick={() => setModalState(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
