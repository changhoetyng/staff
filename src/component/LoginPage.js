import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { api } from "../api/api";
import "../css/Login.css";
import { render } from "@testing-library/react";
import Cookies from "js-cookie";
import FullPageLoader from "../hooks/FullPageLoader"

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      username: "",
      loading: true,
      password: "",
      error: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.setState({ loading: false });
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
    this.setState({ loading: true });
    await api
      .post("/auth/loginUser", {
        username: this.state.username,
        password: this.state.password
      })
      .then((res) => {
        Cookies.set("accessToken", res.data.accessToken, { expires: 1 });
        Cookies.set("refreshToken", res.data.refreshToken, { expires: 1 });
        this.state.history.replace("/");
      })
      .catch((err) => {
        if (!err.response) {
          this.setState({error: 'Error: Network Error'})
      } else {
        this.setState({error: err.response.data.error})
      }
    });
    this.setState({ loading: false });
  }
  render() {
    return (
      <div className="Login">
        {this.state.loading && <FullPageLoader />}
        <Form id="#loginForm" onSubmit={(e) => this.handleSubmit(e)}>
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
          {<p style={{color: 'red', alignSelf: 'center'}}>{this.state.error}</p>}
          <Button block size="lg" id="loginButton" type="submit" disabled={!this.validateForm()}>
            Login
          </Button>
        </Form>
        
      </div>
    );
  }
}

export default LoginPage;
