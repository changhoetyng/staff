import React, { Component } from "react";
import Header from "../../sharedComponent/Header";
import Table from "react-bootstrap/Table";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { api } from "../../api/api";

class ManageDateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      currentSelection: null,
      currentRoomId: null,
      selectedSub: null,
      selectedSubId: null,
      date: null,
      checkedItems: new Map(),
      activeData: { time: "", timeStatus: { status: "", studentId: "" } },
      modalOn: false,
      data: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await api
      .get("/room/getRoom")
      .then((res) => {
        this.setState({ data: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ loading: false });
  }

  dropdownSelection(selected, id) {
    this.setState({ currentSelection: selected, currentRoomId: id });
  }

  dropdownSub(selected, id) {
    this.setState({ selectedSub: selected, selectedSubId: id });
  }

  renderRoomButton() {
    return (
      <DropdownButton
        id="dropdown-item-button"
        title={
          this.state.currentSelection
            ? this.state.currentSelection
            : "Select a Room"
        }
      >
        {this.state.data.map((v, i) => {
          return (
            <Dropdown.Item
              key={i}
              as="button"
              onSelect={() => this.dropdownSelection(v.room, v.roomId)}
            >
              {v.room}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    );
  }

  renderCategoryButton() {
    return (
      <DropdownButton
        id="dropdown-item-button"
        title={
          !this.state.currentSelection
            ? "Please Select a Room"
            : this.state.selectedSub
            ? this.state.selectedSub
            : "Select a subcategory"
        }
      >
        {this.state.data.map((v, i) => {
          return (
            v.roomId === this.state.currentRoomId && v.subCategory &&
                v.subCategory.map((sub,j) => {
                  return (
                    <Dropdown.Item
                      key={j}
                      as="button"
                      onSelect={() =>
                        this.dropdownSub(sub.subName, sub._id)
                      }
                    >
                      {sub.subName}
                    </Dropdown.Item>
                  );
                })
            
          );
        })}
      </DropdownButton>
    );
  }

  handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  };

  renderTableContent() {
    let selectedRoom = this.state.data.find(
      (v) => v.roomId === this.state.currentRoomId 
    );

    let selectedDate = selectedRoom
      ? selectedRoom.data.find(
          (v) => v.date === moment(this.state.date).format("DD/MM/YYYY") && v.subCategoryId === this.state.selectedSubId
        )
      : null;
    let timeData = selectedDate ? selectedDate.timeListing : [];
    return (
      <tbody>
        {timeData.map((v, i) => {
          return (
            <tr key={i}>
              <td>{v.time}</td>
              <td>{v.timeStatus.status}</td>
              <td>
                <Button
                  variant="link"
                  style={{ marginLeft: 10 }}
                  onClick={() =>
                    this.setState({ activeData: v, modalOn: true })
                  }
                >
                  More Details
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  hideModal() {
    this.setState({ modalOn: false });
  }

  async openBooking() {
    this.setState({ loading: true });
    await api
      .patch("/room/openTime", {
        roomId: this.state.currentRoomId,
        date: moment(this.state.date).format("DD/MM/YYYY"),
        time: this.state.activeData.time,
        subCategoryId: this.state.selectedSubId
      })
      .catch((err) => {
        console.log(err);
      });
    this.componentDidMount();
    this.setState({ loading: false, modalOn: false });
  }

  async closeBooking() {
    this.setState({ loading: true });
    await api
      .patch("/room/closeTime", {
        roomId: this.state.currentRoomId,
        date: moment(this.state.date).format("DD/MM/YYYY"),
        time: this.state.activeData.time,
        subCategoryId: this.state.selectedSubId
      })
      .catch((err) => {
        console.log(err);
      });
    this.componentDidMount();
    this.setState({ loading: false, modalOn: false });
  }

  async cancelBooking() {
    this.setState({ loading: true });
    await api
      .patch("/room/cancelBooking", {
        roomId: this.state.currentRoomId,
        date: moment(this.state.date).format("DD/MM/YYYY"),
        time: this.state.activeData.time,
        subCategoryId: this.state.selectedSubId
      })
      .catch((err) => {
        console.log(err);
      });
    this.componentDidMount();
    this.setState({ loading: false, modalOn: false });
  }

  render() {
    return (
      <div>
        <Header history={this.state.history} />
        <Modal
          show={this.state.modalOn}
          onHide={() => this.hideModal()}
          centered
        >
          <Modal.Header>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Date: {moment(this.state.date).format("DD/MM/YYYY")}
            <br />
            Time: {this.state.activeData.time}
            <br />
            Status: {this.state.activeData.timeStatus.status}
            <br />
            {this.state.activeData.timeStatus.status === "booked" && (
              <div>
                Student ID: {this.state.activeData.timeStatus.studentId}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {this.state.activeData.timeStatus.status === "booked" && (
              <Button variant="danger" onClick={() => this.cancelBooking()}>
                Cancel booking
              </Button>
            )}
            {this.state.activeData.timeStatus.status === "open" && (
              <Button onClick={() => this.closeBooking()}>Close booking</Button>
            )}
            {this.state.activeData.timeStatus.status === "close" && (
              <Button onClick={() => this.openBooking()}>Open booking</Button>
            )}
          </Modal.Footer>
        </Modal>
        <div className="container float-left">
          <div className="container-fluid" style={{ marginTop: 20 }}>
            <h4>Sport Complex</h4>
          </div>
          <div
            className="container-fluid"
            style={{ marginTop: 20, flexDirection: "row" }}
          >
            <Row>
              <Col>{this.renderRoomButton()}</Col>
              <Col>{this.renderCategoryButton()}</Col>
              {
                <Col>
                  <DatePicker
                    selected={this.state.date}
                    isClearable
                    onChange={(date) => this.setState({ date })}
                  />
                </Col>
              }
            </Row>
          </div>
          <div className="container-fluid" style={{ marginTop: 20 }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              {this.renderTableContent()}
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageDateRoom;
