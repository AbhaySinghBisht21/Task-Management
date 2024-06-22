import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskDetail from "./components/TaskDetail.jsx";
import TaskEdit from "./components/TaskEdit.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TaskList />} />
        <Route path="/new" element={<TaskForm />} />
        <Route path="/tasks/:taskId" element={<TaskDetail />} />
        <Route path="/edit/:id" element={<TaskEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
