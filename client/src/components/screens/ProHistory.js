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
import Badge from "react-bootstrap/Badge";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

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

const ProHistory = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [payamount, setPayamount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [paymentStatus, setPaymentstatus] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
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
      paymentStatus: "",
    },
  ]);

  useEffect(() => {
    fetch("/userPro/workDone", {
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
                  className="h4 card-header"
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
                        <StyledTableCell align="right">Amount</StyledTableCell>
                        <StyledTableCell align="right">Description</StyledTableCell>
                        <StyledTableCell align="center">
                          Payment Status
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
                            {data1.payamount}
                          </StyledTableCell>
                          {data.length !== 0 && (
                            <StyledTableCell align="right">
                              {data1.description}
                            </StyledTableCell>
                          )}

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

export default ProHistory;
