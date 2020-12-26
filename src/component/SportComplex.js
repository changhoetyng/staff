import React, { Component } from "react";
import Header from "../sharedComponent/Header";
import Table from "react-bootstrap/Table";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      currentSelection: null,
      date: null,
    };
  }

  dropdownSelection(selected) {
    this.setState({ currentSelection: selected });
  }

  render() {
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
              <Col>
                <DropdownButton
                  id="dropdown-item-button"
                  title={
                    this.state.currentSelection
                      ? this.state.currentSelection
                      : "Select a facility"
                  }
                >
                  <Dropdown.Item
                    as="button"
                    onSelect={() => this.dropdownSelection("Badminton Court")}
                  >
                    Badminton Court
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onSelect={() => this.dropdownSelection("Squash")}
                  >
                    Squash
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              {
              
              <Col>
                <DatePicker selected={this.state.date ? this.state.date : new Date()} onChange={(date) => this.setState({date})} />
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
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>9am</td>
                  <td>Not open for booking</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>10am</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>11am</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
