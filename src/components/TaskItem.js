import { useHistory } from "react-router";
import {Flex} from "@chakra-ui/react";

export const TaskItem = ({ id, isChecked, taskName, onTaskChange }) => {
  const history = useHistory();

  const styleOfTheComponent = {
    textDecoration: isChecked ? "line-through" : "",
  };

  const handleClick = () => {
    const url = `/tasks/${id}`;
    history.push(url);
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <li>
        <input onChange={onTaskChange} checked={isChecked} type="checkbox" />
        <span style={styleOfTheComponent}>{taskName}</span>
        <button onClick={handleClick}>Edit</button>
      </li>
    </Flex>
  );
};
