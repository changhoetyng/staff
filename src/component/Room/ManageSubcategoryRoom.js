import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FullPageLoader from "../../hooks/FullPageLoader";
import Header from "../../sharedComponent/Header";
import "../../css/Setting.css";
import { api } from "../../api/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { QRCode } from "react-qr-svg";

class ManageSubcategoryRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      currentSelection: null,
      currentRoomId: null,
      subCategory: "",
      data: [],
      loading: false,
      qrCodeModal: false,
      selectedQR: "",
      isAdmin: false
    };
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
        console.log(res.data.data);
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

  openQrCode(sub) {
    this.setState({ selectedQR: sub, qrCodeModal: true });
  }

  handleClose() {
    this.setState({ qrCodeModal: false });
  }

  renderTableContent() {
    let selectedRoom = this.state.data.find(
      (v) => v.roomId === this.state.currentRoomId
    );
    let subCategory = selectedRoom ? selectedRoom.subCategory : [];
    return (
      <div className="row">
        {subCategory &&
          subCategory.map((sub, i) => {
            return (
              <div className="col" key={i}>
                <Card
                  style={{
                    width: "19rem",
                    whiteSpace: "pre-wrap",
                    paddingRight: 0,
                  }}
                >
                  <Card.Body>
                    <Card.Title>{sub.subName}</Card.Title>
                    <Card.Text>
                      {sub.currentUser ? (
                        <p>Current User: {sub.currentUser}</p>
                      ) : (
                        <p>Current User: Not occupied</p>
                      )}
                    </Card.Text>
                    <Card.Link
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.openQrCode(sub);
                      }}
                    >
                      QR Code
                    </Card.Link>
                    { this.state.isAdmin &&
                    <Card.Link
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.removesubcategory(sub._id);
                      }}
                    >
                      Remove
                    </Card.Link>
                    }
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    );
  }

  async removesubcategory(subId) {
    this.setState({ loading: true });

    await api
      .patch("/room/deletesub", {
        roomId: this.state.currentRoomId,
        subCategoryId: subId,
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
    this.componentDidMount();
    this.setState({ loading: false });
  }

  async addsubcategory() {
    this.setState({ loading: true });

    await api
      .patch("/room/addSub", {
        roomId: this.state.currentRoomId,
        subCategory: this.state.subCategory,
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
    this.componentDidMount();
    this.setState({ loading: false, subCategory: "" });
  }

  render() {
    return (
      <div>
        {this.state.loading && <FullPageLoader />}
        <Header history={this.state.history} />
        <div className="container float-left non-printable">
          <h2 id="manageSubcategoryTitle">Manage Subcategory</h2>

          <div style={{ marginTop: 20 }}>
            <h4 id="title">Room</h4>
            <div className="container float-left">
              <div className="row" style={{ marginTop: 20 }}>
                {this.renderRoomButton()}
              </div>
              <div className="row" style={{ marginBottom: 20, marginTop: 20 }}>
                {this.renderTableContent()}
              </div>
              { this.state.isAdmin &&
              <div className="row,container float-left">
                <div className="row">
                  <p className="word">Manage Subcategory:</p>
                  <div className="col">
                    <input
                      type="text"
                      value={this.state.subCategory}
                      onChange={(e) =>
                        this.setState({ subCategory: e.target.value })
                      }
                    />
                  </div>
                  <div className="col">
                    <Button onClick={() => this.addsubcategory()}>Add</Button>
                  </div>
                </div>
              </div>
              }
            </div>
          </div>
        </div>
        <div class="non-printable">
          <Modal
            show={this.state.qrCodeModal}
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => this.handleClose()}
            centered
          >
            <Modal.Header>
              <Modal.Title>QR Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="printable">
                <h2 style={{ textAlign: "center" }}>
                  {this.state.currentSelection}
                </h2>
                <h4 style={{ textAlign: "center" }}>
                  {this.state.selectedQR.subName}
                </h4>
                <div style={{ textAlign: "center" }}>
                  <QRCode
                    level="Q"
                    style={{ width: 256 }}
                    value={JSON.stringify({
                      venueId: this.state.currentRoomId,
                      subCategoryId: this.state.selectedQR._id,
                    })}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => window.print()}>Print</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ManageSubcategoryRoom;
