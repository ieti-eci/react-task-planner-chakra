import axios from "axios";
import { useState } from "react";
import { useData } from "../providers/DataProvider";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const { data, setData } = useData();
  const [textValue, setTextValue] = useState("");

  const tasks = data.tasks;

  const handleTaskChange = (index) => () => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });

    setData((prev) => ({ ...prev, tasks: newTasks }));
  };

  const newTask = (name) => {
    const newTask = {
      isCompleted: false,
      name: name,
    };
    setData((prev) => ({ ...prev, tasks: [...tasks, newTask] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newTask(textValue);
  };

  const handleTextChange = (event) => {
    const value = event.target.value;
    setTextValue(value);
  };

  const [response, setResponse] = useState();

    axios.get("https://tasks-planner-api.herokuapp.com/api/task/all", {
    headers: {"Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW50aWFnb0BtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNjM1OTExMDI3LCJleHAiOjE2MzU5MjkwMjd9.C65vDQVJpYafh0VA_SGLGpUHxcMqqRcI-39CH5LD9hE"}
  }).then((res) => setResponse(res.data)).catch((error) => console.log(error.res))

  return (
    <article>
      <form onSubmit={handleSubmit}>
        <input
          value={textValue}
          onChange={handleTextChange}
          type="text"
          placeholder="Task name"
        />
        <button>Create Task</button>
      </form>

      <ul>
        {response.map((task, index) => {
          return (
            <TaskItem
              id={task.id}
              name={task.name}
              description={task.description}
              dueDate={task.dueDate}
              onTaskChange={handleTaskChange(index)}
            />
          );
        })}
      </ul>
    </article>
  );
};
