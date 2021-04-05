import React, { Component } from "react";
import Header from "../sharedComponent/Header";
import FullPageLoader from "../hooks/FullPageLoader";
import Button from "react-bootstrap/Button";
import "../css/Setting.css";
import { api } from "../api/api";
import Cookies from "js-cookie";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      history: this.props.history,
      username: "",
      email: "",
      isModal: false,
      password: "",
      confirmPassword: "",
      oldPassword: "",
      error: {}
    };
  }

  handleClose() {
    this.setState({ isModal: false });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await api
      .get("/user")
      .then((res) => {
        this.setState({
          username: res.data.user.username,
          email: res.data.user.email,
        });
      })
      .catch((err) => console.log(err));
    this.setState({ loading: false });
  }

  async save() {
    this.setState({ loading: true });
    await api
      .patch("/user/changeEmail", {
        email: this.state.email,
      })
      .catch((err) => console.log(err));
    await api
      .patch("/user/changeUsername", {
        username: this.state.username,
      })
      .then((res) => {
        Cookies.set("accessToken", res.data.accessToken, { expires: 1 });
        Cookies.set("refreshToken", res.data.refreshToken, { expires: 1 });
      })
      .catch((err) => console.log(err));

    this.componentDidMount();
    this.setState({ loading: false });
  }

  async changePassword() {
    this.setState({ loading: true });
    let error = {
        password: "",
        confirmPassword: "",
        oldPassword: ""
    }
    if (this.state.password !== this.state.confirmPassword) {
        error.confirmPassword = "Doesn't match password";
      }
    if (this.state.password === "") {
        error.password = "Password is empty.";
    }
    if (this.state.oldPassword === "") {
        error.oldPassword = "Old password is empty.";
    }
    this.setState({ error });
    if (
        error.confirmPassword === "" &&
        error.password === "" &&
        error.oldPassword === ""
      ) {
        await api
          .patch("/auth/changePassword", {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.password,
          })
          .then((res) => {
            this.setState({ loading: false , isModal: false});
          })
          .catch((err) => {
            console.log(err.response.data);
            this.setState({error: err.response.data.error})
          });
      }
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.isModal}
          aria-labelledby="contained-modal-title-vcenter"
          onHide={() => this.handleClose()}
          centered
        >
          <Modal.Body className="text-center">
            <h4>Change Password</h4>
            <Form>
            <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="input"
                onChange={(e) =>
                  this.setState({ oldPassword: e.target.value })
                }
              />
              <p style={{ color: "red", alignSelf: "left" }}>
                {this.state.error.oldPassword}
              </p>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="input"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <p style={{ color: "red", alignSelf: "left" }}>
                {this.state.error.password}
              </p>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="input"
                onChange={(e) =>
                  this.setState({ confirmPassword: e.target.value })
                }
              />
              <p style={{ color: "red", alignSelf: "left" }}>
                {this.state.error.confirmPassword}
              </p>
            </Form>
            <Button onClick={() => this.changePassword()}>Change Password</Button>
          </Modal.Body>
        </Modal>
        {this.state.loading && <FullPageLoader />}
        <Header history={this.state.history} />
        <div className="container mainDiv float-left">
          <h2> Settings </h2>
          <div className="container overflow-hidden" style={{ marginTop: 20 }}>
            <div className="row">
              <div className="col">
                <p className="word"> Email: </p>
              </div>
              <div className="col">
                <input
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="word"> Username: </p>
              </div>
              <div className="col">
                <input
                  id="usernameInput"
                  type="text"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                <Button id="savePassword" onClick={() => this.save()}> Save </Button>
              </div>
              <div className="col">
                <Button id="changePassword" onClick={() => this.setState({isModal: true})}>
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
