import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import FullPageLoader from "../hooks/FullPageLoader";
import Header from "../sharedComponent/Header";
import "../css/Setting.css";
import { api } from "../api/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class ManageStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      data: [],
      loading: false,
      isModal: false,
      email: "",
      username: "",
      password: "",
      error: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await api
      .get("/user/getAllStaff")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ loading: false });
  }

  async removeStaff(id) {
    console.log(id);
    this.setState({ loading: true });
    await api.delete(`/user/deleteUser/${id}`).catch((err) => {
      console.log(err);
    });
    this.componentDidMount();
    this.setState({ loading: false });
  }

  renderTableContent() {
    return (
      <div className="row">
        {this.state.data &&
          this.state.data.map((sub, i) => {
            return (
              <div className="col" key={i}>
                <Card
                  style={{
                    width: "18rem",
                    whiteSpace: "pre-wrap",
                    paddingRight: 0,
                  }}
                >
                  <Card.Body>
                    <Row>
                      <Col sm={8}>
                        <Card.Text>{sub.username}</Card.Text>
                      </Col>
                      <Col>
                        <Card.Link
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            this.removeStaff(sub._id);
                          }}
                        >
                          Remove
                        </Card.Link>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    );
  }

  handleClose() {
    this.setState({ isModal: false });
  }

  async handleAddStaff() {
    this.setState({ loading: true });
    let error = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com+$/.test(this.state.email)) {
      error.email = "Invalid email";
    }
    if (this.state.username === "") {
      error.username = "Username is empty.";
    }
    if (this.state.password !== this.state.confirmPassword) {
      error.confirmPassword = "Doesn't match password";
    }
    if (this.state.password === "") {
      error.password = "Password is empty.";
    }
    this.setState({ error });
    if (
      error.email === "" &&
      error.username === "" &&
      error.confirmPassword === "" &&
      error.password === ""
    ) {
      await api
        .post("/user/createUser", {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          this.setState({data: [res.data,...this.state.data]})
          this.setState({ loading: false , isModal: false});
        })
        .catch((err) => {
          console.log(err.response.data);
          this.setState({error: err.response.data.errors})
        });
    }
    this.setState({ loading: false});
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
            <h4>Add Staff</h4>
            <Form>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <p style={{ color: "red", alignSelf: "left" }}>
                {this.state.error.email}
              </p>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="input"
                onChange={(e) => this.setState({ username: e.target.value })}
              />
              <p style={{ color: "red", alignSelf: "left" }}>
                {this.state.error.username}
              </p>
              <Form.Label>Password</Form.Label>
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
            <Button onClick={() => this.handleAddStaff()}>Add Staff</Button>
          </Modal.Body>
        </Modal>
        {this.state.loading && <FullPageLoader />}
        <Header history={this.state.history} />
        <div className="container float-left">
          <h2 style={{ marginTop: 20 }}>Manage Staff</h2>
          <div style={{ marginTop: 20 }}>{this.renderTableContent()}</div>
          <div style={{ marginTop: 20 }}>
            <Button onClick={() => this.setState({ isModal: true })}>
              Add Staff
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageStaff;
