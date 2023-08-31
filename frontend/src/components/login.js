import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

const Login = props => {
  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate(); 

  const login = () => {
    props.login(user)
    navigate("/restaurants")
  }

  return (
    <div>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label htmlFor="user">Username</Form.Label>
            <Form.Control
              type="text"
              id="name"
              required
              value={user.name}
              onChange={handleInputChange}
              name="name"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="id">ID</Form.Label>
            <Form.Control
              type="text"
              id="id"
              required
              value={user.id}
              onChange={handleInputChange}
              name="id"
            />
          </Form.Group>

          <Button onClick={login} className="mt-2">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
