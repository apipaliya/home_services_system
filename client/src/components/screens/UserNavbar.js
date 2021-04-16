import React, { Component, useEffect } from "react";

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
  MDBListGroup,
  MDBIcon,
  MDBListGroupItem,
  MDBDropdownItem,
} from "mdbreact";

import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

var arr;
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  arr = user.name.split(" ", 1);
}

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
          <MDBNavbarNav right style={{ marginTop: "1rem" }}>
            <MDBNavItem>
              <MDBDropdown>
                {
                  <MDBDropdownToggle nav caret>
                    <div className="d-md-inline d-sm-inline d-inline">
                      <MDBIcon icon="user-circle" /> &nbsp;{arr}
                    </div>
                  </MDBDropdownToggle>
                }
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem
                    href="##"
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    LogOut
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/userHome">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-md-inline d-sm-inline d-inline">
                    Appointments
                  </div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/userBookings">
                    Your Bookings
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/userHistory">History</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/contactus">Contact Us</MDBNavLink>
            </MDBNavItem>

            {/* <MDBNavItem>
              <MDBNavLink
                to="##"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </MDBNavLink>
            </MDBNavItem> */}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default UserNavBar;
