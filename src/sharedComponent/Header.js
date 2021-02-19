import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
    };
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>UNMC Staff</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.state.history.replace('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => this.state.history.replace('/sportcomplex/')}>Sport Complex</Nav.Link>
            <Nav.Link onClick={() => this.state.history.replace('/addsubcategory/')}>Add Subcategory</Nav.Link>
            <Nav.Link onClick={() => this.state.history.replace('/managevenue/')}>Manage Venue</Nav.Link>
            <Nav.Link onClick={() => this.state.history.replace('/managestaff/')}>Manage Staff</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="mr-auto">
            <Nav.Link onClick={() => this.state.history.replace('/settings/')}>Settings</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
