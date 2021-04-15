import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AdminNavbar from "./AdminNavbar";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import PersonIcon from '@material-ui/icons/Person';
import Footer from "../Footer";
import { useHistory } from "react-router";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Admin = () => {
  const history = useHistory();
  const classes = useStyles();

  const [data, setdata] = useState([
    {
      name: "",
      mobile: "",
      zipcode: "",
      city: "",
      address: "",
      email: "",
      profession: "",
    },
  ]);

  useEffect(() => {
    fetch("/verifyProfessional", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((datadetail) => {
        if (datadetail.error) {
          console.log(datadetail.error);
          history.push("/adminLogin");
        } else {
          console.log(datadetail);
          setdata(datadetail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <AdminNavbar />

      <br />
      
      <div className="rows">
              <div className="col-lg-4 col-md- col-sm-8">
                <div className="card card-stats" >
                  <div className="card-header card-header-warning card-header-icon">
                    <div className="card-icon">
                      <i className="material-icons">weekend</i>
                    </div>
                    <p className="card-category">Bookings</p>
                    <h3 className="card-title">184</h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats" style={{display:'flex'}}>
                      <i className="material-icons text-danger">warning</i>
                      <a href="#pablo">Get More Space...</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-header card-header-rose card-header-icon">
                    <div className="card-icon">
                      <i className="material-icons">equalizer</i>
                    </div>
                    <p className="card-category">Website Visits</p>
                    <h3 className="card-title">75.521</h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats" style={{display:'flex'}}>
                      <i className="material-icons">local_offer</i> Tracked from Google Analytics
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-header card-header-success card-header-icon">
                    <div className="card-icon">
                      <i className="material-icons">store</i>
                    </div>
                    <p className="card-category">Revenue</p>
                    <h3 className="card-title">$34,245</h3>
                  </div>
                  <div className="card-footer">
                    <div className="stats"style={{display:'flex'}}>
                      <i className="material-icons">date_range</i> Last 24 Hours
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card card-stats">
                  <div className="card-header card-header-info card-header-icon">
                    <div className="card-icon">
                    <PersonIcon>
                      <i className="material-icons"></i>
                      </PersonIcon>
                    </div>
                    <p className="card-category">Followers</p>
                    <h3 className="card-title">+245</h3>
                  </div>
                  <div className="card-footer" >
                    <div className="stats" style={{display:'flex'}}>
                      <i className="material-icons">update</i> Just Updated
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
      
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div
                  className="h4 card-header"
                  style={{
                    backgroundColor: "#2196f3",
                    color: "white",
                    borderRadius: "0.50rem",
                    fontFamily: "Roboto !important",
                  }}
                >
                  <p className="m-auto text-center">Verify Professional</p>
                </div>
              </div>
              <div className="card">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Mobile No.</StyledTableCell>
              <StyledTableCell align="right">Profession</StyledTableCell>
              <StyledTableCell align="right">ZipCode</StyledTableCell>
              <StyledTableCell align="right">City</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="center">Verify</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {data.name}
                </StyledTableCell>
                <StyledTableCell align="right">{data.email}</StyledTableCell>
                <StyledTableCell align="right">{data.mobile}</StyledTableCell>
                <StyledTableCell align="right">
                  {data.profession}
                </StyledTableCell>
                <StyledTableCell align="right">{data.zipcode}</StyledTableCell>
                <StyledTableCell align="right">{data.city}</StyledTableCell>
                <StyledTableCell align="right">{data.address}</StyledTableCell>

                <StyledTableCell align="center">
                  <IconButton
                    style={{ color: "green" }}
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      fetch("/verificationSuccess", {
                        method: "post",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization:
                            "Bearer " + localStorage.getItem("jwt"),
                        },
                        body: JSON.stringify({
                          email: data.email,
                        }),
                      })
                        .then((res) => res.json())
                        .then((datadetail) => {
                          if (datadetail.error) {
                            console.log(datadetail.error);
                          } else {
                            fetch("/email/add", {
                              method: "post",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization:
                                  "Bearer " + localStorage.getItem("jwt"),
                              },
                              body: JSON.stringify({
                                email: data.email,
                              }),
                            })
                              .then((res) => res.json())
                              .then((datadetail) => {
                                if (datadetail.error) {
                                  console.log(datadetail.error);
                                } else {
                                  console.log(datadetail);
                                  window.location.reload();
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                            console.log(datadetail);
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    <DoneOutlineIcon />
                  </IconButton>

                  <IconButton
                    style={{ color: "red" }}
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      fetch("/verificationCancel", {
                        method: "post",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization:
                            "Bearer " + localStorage.getItem("jwt"),
                        },
                        body: JSON.stringify({
                          email: data.email,
                        }),
                      })
                        .then((res) => res.json())
                        .then((datadetail) => {
                          if (datadetail.error) {
                            console.log(datadetail.error);
                          } else {
                            fetch("/email/delete", {
                              method: "post",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization:
                                  "Bearer " + localStorage.getItem("jwt"),
                              },
                              body: JSON.stringify({
                                email: data.email,
                              }),
                            })
                              .then((res) => res.json())
                              .then((datadetail) => {
                                if (datadetail.error) {
                                  console.log(datadetail.error);
                                } else {
                                  console.log(datadetail);
                                  window.location.reload();
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                            console.log(datadetail);
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
     </div>
     </div>
     </div>
     </div>
    </>
  );
};

export default Admin;
