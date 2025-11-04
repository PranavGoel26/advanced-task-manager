import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ThemeToggle from "./ThemeToggle";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <div className="app">
        <h1>📝 Task Manager</h1>
        <ThemeToggle />
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}


export default App;
