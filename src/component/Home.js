import React, { Component } from "react";
import Header from "../sharedComponent/Header";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      text: "",
      data: [
        {
           "time":"13/12/2020",
           "data": "Dear Student and staff"
        }
     ],
    };
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div>
        <Header history={this.state.history} />
        <div className="container float-left">
          <h2>Home page</h2>
          <h4>Post Announcement</h4>
          <div className="container-fluid" style={{ marginTop: 10 }}>
            <Row
              className="justify-content-center"
              style={{ justifyContent: "center" }}
            >
              <textarea
                style={{ resize: "none", width: "100%" }}
                value={this.state.textAreaValue}
                onChange={(event) => this.handleChange(event)}
                rows={10}
              />
            </Row>
            <Row style={{ marginTop: 20, justifyContent: "flex-end" }}>
              <Button onClick={() => this.setState({data: [...this.state.data, {time: "14/12/2020", data: this.state.text}]})} >Post</Button>
            </Row>
          </div>
          <h4>Posted Announcement</h4>
          <Row>
            {this.state.data.map((v,i) => {
              return(
              <Col key={i}>
              <Card style={{ width: "18rem" , whiteSpace: 'pre-wrap'}}>
                <Card.Body>
                  <Card.Title>{v.time}</Card.Title>
                  <Card.Text>
                   {v.data}
                  </Card.Text>
                  <Button variant="primary">Delete</Button>
                </Card.Body>
              </Card>
            </Col>
            )
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
