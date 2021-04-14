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
import AdminNavbar from "./AdminNavbar";
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

const AdminTransaction = () => {
  const history = useHistory();
  const classes = useStyles();

  const [data1, setdata1] = useState([
    {
      paymentid: "",
      Amount: "",
      paymentstatus: "",
      order_id: "",
      bookingid: "",
      date: "",
      senderemail: "",
      receiveremail: "",
    },
  ]);
  
  const [data, setdata] = useState([
    {
      description: "",
    },
  ]);

  useEffect(() => {
    fetch("/transaction", {
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
          setdata(datadetail[0]);
          setdata1(datadetail[1]);
          console.log(datadetail[0]);
          console.log(datadetail[1]);
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
                  <p className="m-auto text-center">Transaction</p>
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
                        <StyledTableCell>Payment Id</StyledTableCell>
                        <StyledTableCell align="right">
                          User Email
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Professionals Email
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Booking Id
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Date & Time
                        </StyledTableCell>
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
                          {data1.length !== 0 && (
                            <StyledTableCell component="th" scope="row">
                              {data1.paymentid}
                            </StyledTableCell>
                          )}
                          {data1.length !== 0 && (
                            <StyledTableCell align="right">
                              {data1.senderemail}
                            </StyledTableCell>
                          )}
                          {data1.length !== 0 && (
                            <StyledTableCell align="right">
                              {data1.receiveremail}
                            </StyledTableCell>
                          )}
                          {data1.length !== 0 && (
                            <StyledTableCell align="right">
                              {data1.bookingid}
                            </StyledTableCell>
                          )}
                          <StyledTableCell align="right">
                            {data1.date}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {data1.Amount}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {data[index].description}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {data1.paymentstatus ? (
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

export default AdminTransaction;
