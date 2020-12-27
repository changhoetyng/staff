import React, { Component } from "react";
import Header from "../sharedComponent/Header";
import Table from "react-bootstrap/Table";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Button from 'react-bootstrap/Button'

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      currentSelection: null,
      date: null,
      checkedItems: new Map(),
      data: [
        {
          id: 1,
          facility: "Badminton Court",
          data: [
            {
              date: "26-12-2020",
              timeListing: [
                {
                  time: "9am",
                  timeStatus: {
                    status: "close",
                    studentId: null,
                  },
                },
                {
                  time: "10am",
                  timeStatus: {
                    status: "open",
                    studentId: null,
                  },
                },
                {
                  time: "11am",
                  timeStatus: {
                    status: "booked",
                    studentId: "20113422",
                  },
                },
              ],
            },
          ],
        },
        {
          id: 2,
          facility: "Squash",
          data: [
            {
              date: "27-12-2020",
              timeListing: [
                {
                  time: "10am",
                  timeStatus: {
                    status: "booked",
                    studentId: "20113422",
                  },
                },
                {
                  time: "11am",
                  timeStatus: {
                    status: "close",
                    studentId: null,
                  },
                },
                {
                  time: "12am",
                  timeStatus: {
                    status: "open",
                    studentId: null,
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  }

  dropdownSelection(selected) {
    this.setState({ currentSelection: selected });
  }

  renderDropdownButton() {
    return (
      <DropdownButton
        id="dropdown-item-button"
        title={
          this.state.currentSelection
            ? this.state.currentSelection
            : "Select a facility"
        }
      >
        {this.state.data.map((v) => {
          return (
            <Dropdown.Item
              key={v.id}
              as="button"
              onSelect={() => this.dropdownSelection(v.facility)}
            >
              {v.facility}
            </Dropdown.Item>
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

  renderCheckBoxName(status){
    if(status === 'close'){
      return "Open for booking"
    }
    
    if(status === 'open'){
      return "Close for booking"
    }

    if(status === 'booked'){
      return "Clear booked slot"
    }
  }

  renderTableContent() {
    let selectedFacility = this.state.data.find(
      (v) => v.facility === this.state.currentSelection
    );
    let selectedDate = selectedFacility
      ? selectedFacility.data.find(
          (v) => v.date === moment(this.state.date).format("DD-MM-YYYY")
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
                <input
                  type="checkbox"
                  name={v.time}
                  checked={
                    this.state.checkedItems.get(v.time)
                      ? this.state.checkedItems.get(v.time)
                      : false
                  }
                  onChange={this.handleChange}
                  style={{marginRight: 10}}
                />
                {this.renderCheckBoxName(v.timeStatus.status)}
                <Button variant="link" style={{marginLeft: 10}}>More Details</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    [...this.state.checkedItems.keys()].map((v) => {
      const getCheckStatus = this.state.checkedItems.get(v);
      return console.log("Time: " + v + "\n Status: " + getCheckStatus);
    });
    return (
      <div>
        <Header history={this.state.history} />
        <div className="container float-left">
          <div className="container-fluid" style={{ marginTop: 20 }}>
            <h4>Sport Complex</h4>
          </div>
          <div
            className="container-fluid"
            style={{ marginTop: 20, flexDirection: "row" }}
          >
            <Row>
              <Col>{this.renderDropdownButton()}</Col>
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
                  <th>Selection</th>
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

export default Test;
