import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FullPageLoader from "../../hooks/FullPageLoader";
import DatePicker from "react-datepicker";
import Header from "../../sharedComponent/Header";
import "../../css/Setting.css";
import { api } from "../../api/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import DropdownButton from "react-bootstrap/DropdownButton";
import moment from "moment";

class ManageVenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      currentSelection: null,
      selectedSubCategory: null,
      data: [],
      loading: false,
      fields: {},
      isModal: false,
      selectedSubCategoryId: null,
      error: "",
      room: "",
      isAdmin: false,
    };
  }

  async removeFacility(roomId) {
    this.setState({ loading: true });
    await api
      .delete("/room/deleteRoom", {
        data: { roomId },
      })
      .then(() => {
        this.componentDidMount();
      })
      .catch((err) => {
        console.log(err.response);
      });
    this.setState({ loading: false });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await api
      .get("/user")
      .then((res) => {
        const role = res.data.user.role;
        if (role === "admin") {
          this.setState({ isAdmin: true });
        }
      })
      .catch((err) => console.log(err));
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

  handleDateChange = (dateName, dateValue) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [dateName]: dateValue,
      },
    });
  };

  renderDropdown() {
    return (
      <DropdownButton
        id="dropdown-item-button"
        title={
          this.state.selectedSubCategory
            ? this.state.selectedSubCategory
            : "Select"
        }
      >
        {this.state.currentSelection &&
          this.state.currentSelection.subCategory &&
          this.state.currentSelection.subCategory.map((v, i) => {
            return (
              <Dropdown.Item
                key={i}
                as="button"
                onSelect={() =>
                  this.setState({
                    selectedSubCategoryId: v._id,
                    selectedSubCategory: v.subName,
                  })
                }
              >
                {v.subName}
              </Dropdown.Item>
            );
          })}
      </DropdownButton>
    );
  }

  renderRoomCard() {
    return this.state.data.map((data, index) => {
      return (
        <Col key={index}>
          <Card className="text-center" style={{ width: 300 }}>
            <Card.Body>
              <Card.Title>{data.room}</Card.Title>
              <DatePicker
                selected={this.state.fields[data.roomId]}
                minDate={new Date()}
                isClearable
                onChange={(date) => this.handleDateChange(data.roomId, date)}
              />
            </Card.Body>
            {this.state.fields[data.roomId] && (
              <Card.Body>
                <Card.Link
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.setState({ currentSelection: data, isModal: true })
                  }
                >
                  Open Date
                </Card.Link>
              </Card.Body>
            )}
            {this.state.isAdmin && (
              <Card.Body>
                <Card.Link
                  style={{ cursor: "pointer" }}
                  onClick={() => this.removeFacility(data.roomId)}
                >
                  Remove
                </Card.Link>
              </Card.Body>
            )}
          </Card>
        </Col>
      );
    });
  }

  async addRoom() {
    this.setState({ loading: true });
    await api
      .post("/room/addRoom", {
        name: this.state.room,
      })
      .catch((err) => {
        console.log(err);
      });
    this.componentDidMount();
    this.setState({ loading: false });
  }

  async openDate() {
    const roomId = this.state.currentSelection.roomId;
    const subCategoryId = this.state.selectedSubCategoryId;
    const date = moment(this.state.fields[roomId]).format("DD/MM/YYYY");
    this.setState({ loading: true });
    await api
      .post("/room/openDate", {
        roomId,
        date,
        subCategoryId,
      })
      .then(() => {
        this.setState({ isModal: false });
      })
      .catch((err) => {
        if (err.response.data.message === "time already exists") {
          this.setState({ error: "Time already existed" });
        }
      });
    this.setState({ loading: false });
  }

  handleClose() {
    this.setState({
      isModal: false,
      selectedSubCategory: null,
      selectedSubCategoryId: null,
      currentSelection: null,
      error: "",
    });
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
            <h4>Select subcategory</h4>
            <div>{this.renderDropdown()}</div>
            {this.state.selectedSubCategoryId && (
              <Button style={{marginTop: 10}} onClick={() => this.openDate()}>Open</Button>
            )}
            <p style={{ color: "red", alignSelf: "left" }}>
              {this.state.error}
            </p>
          </Modal.Body>
        </Modal>
        {this.state.loading && <FullPageLoader />}
        <Header history={this.state.history} />
        <div className="container float-left">
          <h2 id="manageVenueTitle">Manage Venue</h2>
          <div style={{ marginTop: 20 }}>
            <h4 id="title">Room</h4>
          </div>
          <div style={{ marginTop: 20 }}>
            <Row>{this.renderRoomCard()}</Row>
            {
              this.state.isAdmin &&
              <div className="container float-left mt-4">
              <div className="row">
                <p className="word">Add Room:</p>
                <div className="col">
                  <input
                    type="text"
                    value={this.state.subCategory}
                    onChange={(e) => this.setState({ room: e.target.value })}
                  />
                  <Button
                    style={{ marginLeft: 20 }}
                    onClick={() => this.addRoom()}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
            }
            
          </div>
        </div>
      </div>
    );
  }
}

export default ManageVenue;
