import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const apiEndpoint = `http://localhost:5000/api/tasks/${taskId}`;
        const response = await axios.get(apiEndpoint);
        setTask(response.data.task);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  if (!task) {
    return <h2>Task not found</h2>;
  }

  const convertDate = (dueDate) => {
    const formattedDueDate = format(new Date(dueDate), "MMMM dd, yyyy");
    return formattedDueDate;
  };

  return (
    <div>
      <h1 className="mb-4">{task.title}</h1>
      <p>{task.description}</p>
      <p>Due Date:{convertDate(task.dueDate)}</p>
      <Link to={`/edit/${task._id}`} className="btn btn-warning me-2">
        Edit
      </Link>
      <Link to="/" className="btn btn-secondary">
        Back to List
      </Link>
    </div>
  );
};

export default TaskDetail;
