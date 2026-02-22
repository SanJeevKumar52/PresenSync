import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markAttendance = async () => {
    try {
      const { data } = await API.post("/attendance/mark");
      setMessage(data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error marking attendance");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await API.put(`/tasks/${id}`, {
        status: currentStatus === "pending" ? "completed" : "pending",
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>

      <hr />

      <button onClick={markAttendance} style={styles.attendanceBtn}>
        Mark Attendance
      </button>

      {message && <p>{message}</p>}

      <hr />

      <h3>Create Task</h3>

      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Task
        </button>
      </form>

      <hr />

      <h3>Your Tasks</h3>

      {tasks.map((task) => (
        <div key={task._id} style={styles.taskCard}>
          <p>
            <strong>{task.title}</strong>
          </p>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button
            onClick={() => toggleStatus(task._id, task.status)}
            style={styles.smallBtn}
          >
            Toggle Status
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
  },
  logout: {
    marginBottom: "1rem",
    padding: "6px 12px",
  },
  attendanceBtn: {
    padding: "8px 14px",
    marginBottom: "10px",
  },
  input: {
    display: "block",
    padding: "8px",
    marginBottom: "8px",
    width: "250px",
  },
  button: {
    padding: "8px 14px",
  },
  taskCard: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
  },
  smallBtn: {
    padding: "5px 10px",
  },
};

export default Dashboard;