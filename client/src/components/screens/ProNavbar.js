import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBIcon,
  MDBDropdownItem,
} from "mdbreact";

var arr; 
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  arr = user.name.split(" ", 1);
}

class ProNavBar extends Component {

  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <MDBNavbar
        color="#1e88e5 blue darken-1"
        dark
        expand="md"
        className="rounded-b-lg"
      >
        <MDBNavbarBrand>
          <strong className="white-text">Helping Hands At Home</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right style={{marginTop:'1rem'}}>
          <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-md-inline d-sm-inline d-inline">
                  <MDBIcon icon="user-tie" /> &nbsp;{arr}
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/profilepro">Profile</MDBDropdownItem>
                
                  <MDBDropdownItem href="##" onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}>LogOut</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            {/* <MDBNavItem>
              <MDBNavLink to="/profilepro">Profile</MDBNavLink>
            </MDBNavItem> */}
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-md-inline d-sm-inline d-inline">
                    Appointments
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/appointments">
                    Accept/Reject
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/todo">TO DO</MDBDropdownItem>
                  <MDBDropdownItem href="/proworkHistory">
                    History
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/proTransaction">Transaction</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/contactus">Contact Us</MDBNavLink>
            </MDBNavItem>
            
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default ProNavBar;
