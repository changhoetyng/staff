import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { api } from "../api/api";
import "../css/Login.css";
import { render } from "@testing-library/react";
import Cookies from "js-cookie";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      username: "",
      password: "",
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  setPassword(value) {
    this.setState({ password: value });
  }

  setUsername(value) {
    this.setState({ username: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await api
      .post("/authentication/loginUser", {
        username: this.state.username,
        password: this.state.password
      })
      .then((res) => {
        Cookies.set("accessToken", res.data.accessToken, { expires: 1 });
        Cookies.set("refreshToken", res.data.refreshToken, { expires: 1 });
      })
      .catch((err) => console.log(err));

    this.state.history.replace("/");
  }
  render() {
    return (
      <div className="Login">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="username"
              value={this.state.username}
              onChange={(e) => this.setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={(e) => this.setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!this.validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default LoginPage;
