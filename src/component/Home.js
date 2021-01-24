import React, { Component } from "react";
import Header from "../sharedComponent/Header";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {api} from "../api/api" 
import FullPageLoader from "../hooks/FullPageLoader";
import moment from "moment"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      announcement: "",
      title: "",
      data: [],
     loading: false
    };
  }

  handleChange(event) {
    this.setState({ announcement: event.target.value });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await api
    .get("/announcement/getAnnouncement")
    .then((res)=> {
      this.setState({data: res.data})
    })
    .catch((err)=> {
      console.log(err)
    })
    this.setState({ loading: false });
  }

  async postAnnouncement() {
    this.setState({ loading: true });
    await api
    .post("/announcement/postAnnouncement", {
      title: this.state.title,
      announcement: this.state.announcement
    })
    .then((res)=> {
      this.setState({data: [res.data, ...this.state.data],textAreaValue: "", textAreaValue2: ""})
    })
    .catch((err)=> {
      console.log(err)
    })
    this.setState({ loading: false });
  }

  async deleteAnnouncement(_id) {
    this.setState({ loading: true });
    await api
    .delete(`/announcement/deleteAnnouncement/${_id}`)
    .catch((err)=> {
      console.log(err)
    })
    this.componentDidMount()
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        {this.state.loading && <FullPageLoader />}
        <Header history={this.state.history} />
        <div className="container float-left">
          <h2>Home page</h2>
          <h4>Post Announcement</h4>
          <div className="container-fluid" style={{ marginTop: 10 }}>
            <Row
              className="justify-content-center"
              style={{ justifyContent: "center" }}
            >
              <h6>Title</h6>
              <textarea
                style={{ resize: "none", width: "100%" }}
                value={this.state.textAreaValue}
                onChange={(event) => this.handleTitleChange(event)}
                rows={1}
              />
              <h6>Announcement</h6>
              <textarea
                style={{ resize: "none", width: "100%" }}
                value={this.state.textAreaValue2}
                onChange={(event) => this.handleChange(event)}
                rows={10}
              />
            </Row>
            <Row style={{ marginTop: 20, justifyContent: "flex-end" }}>
              <Button onClick={() => this.postAnnouncement()} >Post</Button>
            </Row>
          </div>
          <h4>Posted Announcement</h4>
          <Row>
            {this.state.data.map((v,i) => {
              return(
              <Col key={i}>
              <Card style={{ width: "18rem" , whiteSpace: 'pre-wrap'}}>
                <Card.Body>
                  <Card.Title>{v.title}</Card.Title>
                  <Card.Text>Date: {moment(v.date).format("DD/MM/YYYY")}</Card.Text>
                  <Card.Text>
                   {v.announcement}
                  </Card.Text>
                  <Button variant="primary" onClick={() => this.deleteAnnouncement(v._id)}>Delete</Button>
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
