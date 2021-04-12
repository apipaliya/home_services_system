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

const AdminContact = () => {

  const history = useHistory();
  const classes = useStyles();

  const [data, setdata] = useState([
    {
      name: "",
      email: "",
      subject: "",
      text: "",
    },
  ]);

  useEffect(() => {
    fetch("/contactRemaining", {
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
          history.push("/adminLogin")
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
                  <p className="m-auto text-center">Contact Details</p>
                </div>
              </div>
              <div className="card">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Subject</StyledTableCell>
              <StyledTableCell align="right">Message</StyledTableCell>
              <StyledTableCell align="center">Progress</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {data.name}
                </StyledTableCell>
                <StyledTableCell align="right">{data.email}</StyledTableCell>
                <StyledTableCell align="right">{data.subject}</StyledTableCell>
                <StyledTableCell align="right">{data.text}</StyledTableCell>
               
                <StyledTableCell align="center">
                  <IconButton
                    color="primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      fetch("/contactDone", {
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
                        .then((res) => {
                            res.json()
                            window.location.reload();
                            })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    <DoneOutlineIcon />
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

export default AdminContact;
