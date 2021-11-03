import { TaskList } from "./components/TaskList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TaskForm } from "./components/TaskForm";
import { Login } from "./components/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/tasks">
          <TaskList />
        </Route>
        <Route path="/tasks/:taskId">
          <TaskForm />
        </Route>
        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
