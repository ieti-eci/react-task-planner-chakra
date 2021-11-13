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

  const handleTaskInfo = () => {
      ApiLookup.lookup("GET", "api/task/all", (dataRe) => {
        setData({tasks: dataRe.data});
    }, "");

    return (
      tasks.map((task, index) => {
        return (
          <TaskItem
            id={task.id}
            isChecked={task.isCompleted}
            taskName={task.name}
            description={task.description}
            status={task.status}
            assignedTo={task.assignedTo}
            dueDate={task.dueDate}
            onTaskChange={handleTaskChange(index)}
            />
        );
      } )
    )
  }

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
        {
          handleTaskInfo()
        }
      </ul>
    </article>
  );
};
