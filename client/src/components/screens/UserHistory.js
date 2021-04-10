import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
      <p className="h4 text-center blue-text">Your Bookings</p>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Profession</StyledTableCell>
              <StyledTableCell align="right">Mobile No.</StyledTableCell>
              <StyledTableCell align="right">Date & Time</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="center">Done</StyledTableCell>
              <StyledTableCell align="center">Cancel</StyledTableCell>
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
                <StyledTableCell align="right">{data1.address}</StyledTableCell>
                
                <StyledTableCell align="center">
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={(e) =>{
                      e.preventDefault();
                      var p1 =  {_pid:data[index]._id} ;
                      var b1 =  {_bid:data1._id} ;
                      console.log("p1", p1);
                      console.log("b1", b1);
                      history.push({
                        pathname: "/userPayment",
                        state: { p1 ,b1},
                      });
                    }}
                  >
                    Payment
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <IconButton
                    type="submit"
                    style={{color:"red"}}
                    onClick={(e) => {
                      e.preventDefault();
                      fetch("/bookingCancel", {
                        method: "post",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization:
                            "Bearer " + localStorage.getItem("jwt"),
                        },
                        body: JSON.stringify({
                          _id: data1._id,
                        }),
                      })
                        .then((res) => {
                          res.json();
                          window.location.reload();
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
    </>
  );
};

export default UserHistory;
