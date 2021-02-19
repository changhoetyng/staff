import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Cookies from "js-cookie";
import {api} from "../api/api";
import FullPageLoader from "../hooks/FullPageLoader";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      loading: false,
      isAdmin: false
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await api
      .get("/user")
      .then((res) => {
        const role = res.data.user.role
        if(role === "admin"){
          this.setState({isAdmin: true})
        } else {
          this.setState({isAdmin: false})
        }
      })
      .catch((err) => console.log(err));
    this.setState({ loading: false });
  }

  logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    this.state.history.replace('/login/')
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        {this.state.loading && <FullPageLoader />}
        <Navbar.Brand>UNMC Staff</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.state.history.replace('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => this.state.history.replace('/sportcomplex/')}>Sport Complex</Nav.Link>
            {this.state.isAdmin && <Nav.Link onClick={() => this.state.history.replace('/addsubcategory/')}>Add Subcategory</Nav.Link>}
            <Nav.Link onClick={() => this.state.history.replace('/managevenue/')}>Manage Venue</Nav.Link>
            {this.state.isAdmin && <Nav.Link onClick={() => this.state.history.replace('/managestaff/')}>Manage Staff</Nav.Link>}
          </Nav>
        
        <Nav>
            <Nav.Link onClick={() => this.state.history.replace('/settings/')}>Settings</Nav.Link>
            <Nav.Link onClick={() => this.logout()}>Logout</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
