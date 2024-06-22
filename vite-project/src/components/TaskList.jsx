import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/");
        setTasks(response.data.tasks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  const convertDate = (dueDate) => {
    const formattedDueDate = format(new Date(dueDate), "MMMM dd, yyyy");
    return formattedDueDate;
  };

  return (
    <div>
      <h1 className="mb-4 fw-bold">Task</h1>
      <Link to="/new" className="btn btn-primary mt-3 mb-3">
        Add New Task
      </Link>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <Link to={`/tasks/${task._id}`} className="fw-bold">
                {task.title}
              </Link>
              <p className="truncated-description">
                <strong>Description:</strong> {task.description}
              </p>
              <p>
                <strong>Due Date:</strong> {convertDate(task.dueDate)}
              </p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
