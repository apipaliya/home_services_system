import React, { Component, useContext } from "react";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdbreact";

class AdminNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <MDBNavbar color="#1e88e5 blue darken-1" dark expand="md" className="rounded-b-lg">
        <MDBNavbarBrand>
          <strong className="white-text">Admin Panel</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/admin">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/adminTransaction">Transaction</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/adminContact">Query</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink
                to="##"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default AdminNavbar;
