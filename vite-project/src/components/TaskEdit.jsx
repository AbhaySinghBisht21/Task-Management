import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TaskEdit = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const apiEndpoint = `http://localhost:5000/api/tasks/${id}`;
        const response = await axios.get(apiEndpoint);
        setTask(response.data.task);
        setTitle(response.data.task.title);
        setDescription(response.data.task.description);
        const formattedDueDate = new Date(response.data.task.dueDate)
          .toISOString()
          .split("T")[0];
        setDueDate(formattedDueDate);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiEndpoint = `http://localhost:5000/api/edit/${id}`;
      await axios.put(apiEndpoint, { title, description, dueDate });
      navigate("/");
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-4">Edit Task</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Task
      </button>
    </form>
  );
};

export default TaskEdit;
