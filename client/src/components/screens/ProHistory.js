import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ProNavBar from "./ProNavbar";

import { useHistory } from "react-router";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 700,
  },
}));

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

// const useStyles = makeStyles({
//   table: {
//     minWidth: 700,
//   },

// });

const ProHistory = () => {
  const history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

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
      description: "",
      payamount: "",
    },
  ]);

  useEffect(() => {
    fetch("/workDone", {
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
                    borderRadius: "0.50rem",
                    fontFamily: "Roboto !important",
                  }}
                >
                  <p className="m-auto text-center">Work Done</p>
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
                        <StyledTableCell align="right">Address</StyledTableCell>
                        <StyledTableCell align="right">ZipCode</StyledTableCell>
                        <StyledTableCell align="right">City</StyledTableCell>
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

                          {data.length !== 0 && (
                            <StyledTableCell align="center">
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClickToOpen}
                              >
                                View
                              </Button>
                            </StyledTableCell>
                          )}

                          <Dialog open={open} onClose={handleToClose}>
                            <DialogTitle
                              style={{
                                color: "blue",
                                margin: "auto",
                                fontSize: "18px !important",
                              }}
                            >
                              <b>Payment</b>
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText style={{ color: "black" }}>
                                <b>Amount :</b> {data1.payamount}
                              </DialogContentText>
                              <DialogContentText style={{ color: "black" }}>
                                <b>Description :</b> {data1.description}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleToClose}
                                color="primary"
                                autoFocus
                              >
                                Close
                              </Button>
                            </DialogActions>
                          </Dialog>
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

export default ProHistory;
