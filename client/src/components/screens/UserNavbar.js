import React, { Component } from "react";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdbreact";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";

class UserNavBar extends Component {
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
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/userHome">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/userBookings">Your Bookings</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/userHistory">History</MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink to="/contactus">Contact Us</MDBNavLink>
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

export default UserNavBar;
