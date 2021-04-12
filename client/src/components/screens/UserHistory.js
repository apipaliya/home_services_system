import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Badge from "react-bootstrap/Badge";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import { useHistory } from "react-router";
import UserNavBar from "./UserNavbar";

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

const UserHistory = () => {
  const history = useHistory();
  const classes = useStyles();

  const [data, setdata] = useState([
    {
      // professional
      name: "",
      mobile: "",
      profession: "",
      city: "",
      _id: "",
    },
  ]);
  const [data1, setdata1] = useState([
    {
      address: "",
      dateTime: "",
      zipcode: "",
      payamount: "",
      description: "",
      paymentStatus: "",
      provider: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    fetch("/userworkDone", {
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
          history.push("/login");
        } else {
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
      <UserNavBar />

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
                    borderRadius: "0.50rem",
                    fontFamily: "Roboto !important",
                  }}
                >
                  <p className="m-auto text-center">Completed Appointments</p>
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
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">
                          Profession
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Mobile No.
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Date & Time
                        </StyledTableCell>
                        <StyledTableCell align="right">Address</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                        <StyledTableCell align="right">
                          Description
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Payment
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data1.map((data1, index) => (
                        <StyledTableRow key={index}>
                          {data.length !== 0 && (
                            <StyledTableCell component="th" scope="row">
                              {data[index].name}
                            </StyledTableCell>
                          )}
                          {data.length !== 0 && (
                            <StyledTableCell align="right">
                              {data[index].profession}
                            </StyledTableCell>
                          )}
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
                            {data1.payamount}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {data1.description}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {data1.paymentStatus ? (
                              <h5>
                                <Badge variant="success">Success</Badge>{" "}
                              </h5>
                            ) : (
                              <h5>
                                <Badge variant="danger">Failed</Badge>{" "}
                              </h5>
                            )}
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

export default UserHistory;
