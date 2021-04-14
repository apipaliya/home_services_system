import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ProNavBar from "./ProNavbar";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import { useHistory } from "react-router";
import M from 'materialize-css';

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

const ProBookings = () => {
  const history = useHistory();
  const classes = useStyles();
  const storedData = JSON.parse(localStorage.getItem("user"));

  const [data, setdata] = useState([
    {
      // user
      name: "",
      mobile: "",
      city: "",
      _id: "",
    },
  ]);
  const [data1, setdata1] = useState([
    {
      address: "",
      dateTime: "",
      zipcode: "",
      bookedBy: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    fetch("/verifywork", {
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
          history.push("/loginpro");
        } else {
          console.log(datadetail);
          setdata(datadetail[0]);
          setdata1(datadetail[1]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ProNavBar />
      <br />
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div
                  class="h4 card-header"
                  style={{
                    
                    backgroundColor: "#2196f3",
                    color: "white",
                    borderRadius:"0.50rem",
                    fontFamily: "Roboto !important"
                  }}
                >
                  <p className="m-auto text-center">Appointments</p>
                </div>
                </div>
                <div className="card">
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Customer Name</StyledTableCell>
                          <StyledTableCell align="right">
                            Mobile No.
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            Date & Time
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            Address
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            ZipCode
                          </StyledTableCell>
                          <StyledTableCell align="right">City</StyledTableCell>

                          <StyledTableCell align="center">
                            Accept
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Reject
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data1.length !== 0 &&
                          data1.map((data1, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell component="th" scope="row">
                                {data.length !== 0 && data[index].name}
                              </StyledTableCell>

                              {data.length !== 0 && (
                                <StyledTableCell align="right">
                                  {data[index].mobile}
                                </StyledTableCell>
                              )}
                              <StyledTableCell align="right">
                                {data1.dateTime}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {data1.address}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {data1.zipcode}
                              </StyledTableCell>
                              {data.length !== 0 && (
                                <StyledTableCell align="right">
                                  {data[index].city}
                                </StyledTableCell>
                              )}
                              <StyledTableCell align="center">
                                <IconButton
                                  type="submit"
                                  style={{ color: "green" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    fetch("/confirmBooking", {
                                      method: "post",
                                      headers: {
                                        "Content-Type": "application/json",
                                        Authorization:
                                          "Bearer " +
                                          localStorage.getItem("jwt"),
                                      },
                                      body: JSON.stringify({
                                        _id: data1._id,
                                      }),
                                    })
                                      .then((res) => res.json())
                                      .then((datadetail) => {
                                        if (datadetail.error) {
                                          console.log(datadetail.error);
                                        } else {
                                          fetch("/email/confirm", {
                                            method: "post",
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                              Authorization:
                                                "Bearer " +
                                                localStorage.getItem("jwt"),
                                            },
                                            body: JSON.stringify({
                                              email: data[index].email,
                                              name: storedData.name,
                                              profession: storedData.profession,
                                            }),
                                          })
                                            .then((res) => res.json())
                                            .then((datadetail) => {
                                              if (datadetail.error) {
                                                console.log(datadetail.error);
                                              } else {
                                                console.log(datadetail);
                                                M.toast({
                                                  html: "Mail sent successfully",
                                                  classes: "#43a047 green darken-1",
                                                });
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
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <IconButton
                                  style={{ color: "red" }}
                                  type="submit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    fetch("/denyBooking", {
                                      method: "post",
                                      headers: {
                                        "Content-Type": "application/json",
                                        Authorization:
                                          "Bearer " +
                                          localStorage.getItem("jwt"),
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
                                          fetch("/email/deny", {
                                            method: "post",
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                              Authorization:
                                                "Bearer " +
                                                localStorage.getItem("jwt"),
                                            },
                                            body: JSON.stringify({
                                              email: data.email,
                                              name: storedData.name,
                                              profession: storedData.profession,
                                            }),
                                          })
                                            .then((res) => res.json())
                                            .then((datadetail) => {
                                              if (datadetail.error) {
                                                console.log(datadetail.error);
                                              } else {
                                                console.log(datadetail);
                                                M.toast({
                                                  html: "Mail sent successfully",
                                                  classes: "#43a047 green darken-1",
                                                });
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

export default ProBookings;
