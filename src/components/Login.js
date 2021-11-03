import { Flex, Button, Input, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";

export const Login = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwdRef = useRef();

  const handleLogin = () => {
    axios
      .post("https://tasks-planner-api.herokuapp.com/auth", {
        email: emailRef.current.value,
        password: passwdRef.current.value,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        history.push("/tasks");
      });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input
          placeholder="lazar@chakra-ui.com"
          variant="filled"
          mb={3}
          type="email"
          ref={emailRef}
        />
        <Input
          placeholder="*******"
          variant="filled"
          mb={6}
          type="password"
          ref={passwdRef}
        />
        <Button colorScheme="teal" onClick={handleLogin}>
          Log in
        </Button>
      </Flex>
    </Flex>
  );
};
