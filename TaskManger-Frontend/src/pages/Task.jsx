import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [modalState, setModalState] = useState(null); // "add" or "edit"
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: 1,
    status: "Pending",
    startTime: "",
    endTime: "",
  });

  // Fetch tasks from the server
  useEffect(() => {
    axios
      .get("https://todomanager-hnu2.onrender.com/api/task/getTask")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Handle Add or Edit Task
  const saveTask = async () => {
    if (!newTask.title || !newTask.startTime || !newTask.endTime) {
      alert("Please fill in all fields.");
      return;
    }

    const endpoint = modalState === "add" ? "post" : "put";
    const url =
      modalState === "add"
        ? "https://todomanager-hnu2.onrender.com/api/task/createTask"
        : `https://todomanager-hnu2.onrender.com/api/task/createTask${currentTask?.id}`;

    try {
      const response = await axios[endpoint](url, modalState === "add" ? newTask : currentTask);

      if (modalState === "add") {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        resetForm();
      } else {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === currentTask?.id ? response.data : task))
        );
      }

      setModalState(null);
    } catch (error) {
      console.error(`Error ${modalState === "add" ? "adding" : "updating"} task:`, error);
    }
  };

  // Reset new task form
  const resetForm = () => {
    setNewTask({ title: "", priority: 1, status: "Pending", startTime: "", endTime: "" });
    setCurrentTask(null);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Task List</h1>

        <div className="flex justify-between mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setModalState("add")}
          >
            + Add Task
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              // Delete selected tasks logic
            }}
            disabled={selectedTasks.length === 0}
          >
            Delete Selected
          </button>
        </div>

        {/* Task Table */}
        <table className="table-auto w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-800">
              <th>Select</th>
              <th>ID</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-700">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => {
                      if (selectedTasks.includes(task.id)) {
                        setSelectedTasks(selectedTasks.filter((id) => id !== task.id));
                      } else {
                        setSelectedTasks([...selectedTasks, task.id]);
                      }
                    }}
                  />
                </td>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>{task.startTime}</td>
                <td>{task.endTime}</td>
                <td>{task.totalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modalState && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalState === "add" ? "Add New Task" : "Edit Task"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveTask();
              }}
            >
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={modalState === "add" ? newTask.title : currentTask?.title}
                  onChange={(e) => {
                    if (modalState === "add") {
                      setNewTask({ ...newTask, title: e.target.value });
                    } else if (currentTask) {
                      setCurrentTask({ ...currentTask, title: e.target.value });
                    }
                  }}
                  required
                />
              </div>
              <div>
                <label>Status</label>
                <select
                  value={modalState === "add" ? newTask.status : currentTask?.status}
                  onChange={(e) => {
                    const status = e.target.value;
                    if (modalState === "add") {
                      setNewTask({ ...newTask, status });
                    } else if (currentTask) {
                      setCurrentTask({ ...currentTask, status });
                    }
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
