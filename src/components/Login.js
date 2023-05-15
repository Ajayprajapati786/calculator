import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginIdRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginId = loginIdRef.current.value;
    const password = passwordRef.current.value;

    const data = {
      email: loginId,
      password: password,
      returnSecureToken: true,
    };

    if (loginId === "" || password === "") {
      alert("please enter both email and password");
      return;
    } else {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzsy5Qjnsq2G3A9motcAAKe9oB1IvWJOo",
          data
        );
        console.log(response);
        dispatch(
          authActions.login({
            token: response.data.idToken,
            email: response.data.email,
          })
        );

        history.push("/calculator");
        console.log("success");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="container mt-3">
      <h1 className="text-center">Sign In</h1>
      <Form.Group controlId="formLoginId">
        <Form.Label>Login ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter login ID"
          ref={loginIdRef}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </Form.Group>

      <div className="text-center">
        <Button type="submit" className="mt-2">
          Login
        </Button>
      </div>

      <p className="text-center">
        Don't have an account?
        <Link to="/signup">Signup</Link>
      </p>
    </Form>
  );
};

export default Login;
