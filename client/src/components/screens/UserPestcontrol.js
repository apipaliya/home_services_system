import React, { useState, useEffect } from "react";
import UserNavBar from "./UserNavbar";
import Button from "@material-ui/core/Button";
import Footer from "../Footer";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import M from "materialize-css";
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";

const UserPestcontrol = () => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  let [rev, setReview] = React.useState();

  const handleClickToOpen = (revi) => {
    setOpen(true);
    setReview(revi);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const noData = () => {
    M.toast({
      html: "Review not available",
      classes: "#43a047 red darken-1",
    });
  };

  const [professionals, setProfessionals] = useState([
    {
      name: "",
      address: "",
      charge: "",
      profession: "",
      city: "",
      _id: "",
      rating: "",
      review: [],
    },
  ]);

  useEffect(() => {
    fetch("/pestcontrolPro", {
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
        } else {
          setProfessionals(datadetail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <UserNavBar />
      <MDBRow className="m-auto">
        <Dialog open={open} onClose={handleToClose}>
          <DialogTitle
            style={{
              color: "blue",
              margin: "auto",
              fontSize: "18px !important",
            }}
          >
            <b>Review</b>
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: "black" }}>
              {rev &&
                rev.map((m) => (
                  <ul>
                    {" "}
                    <li> -&gt; {m} </li>{" "}
                  </ul>
                ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        ;
        {professionals.map((pro, index) => {
          return (
            <>
              <div key={index}>
                <MDBCol
                  className="md-4"
                  style={{
                    maxWidth: "21rem",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <MDBCard>
                    <MDBCardImage
                      className="img-fluid"
                      style={{
                        width: "307px",
                        height: "267px",
                        borderTopRightRadius: "1.25rem",
                        borderTopLeftRadius: "1.25rem",
                        margin: "auto",
                        overflow: "hidden",
                      }}
                      src={pro.image}
                      waves
                    />
                    <MDBCardBody>
                      <MDBCardTitle>{pro.name}</MDBCardTitle>
                      <MDBCardText
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "400",
                        }}
                      >
                        {pro.address}
                      </MDBCardText>
                      <MDBCardText
                        style={{
                          color: "green",
                          fontSize: "1rem",
                          fontWeight: "500",
                          margin: "auto",
                        }}
                      >
                        Pincode:{pro.zipcode}
                      </MDBCardText>
                      <div className="flex">
                        <span className=" left text-center py-2">
                          <ReactStars
                            count={5}
                            isHalf={true}
                            size={36}
                            edit={false}
                            value={pro.rating}
                            activeColor="#fbcd0a"
                          />
                        </span>

                        {pro.review.length !== 0 && (
                          <Button
                            className="flex m-auto text-white border-0 py-auto px-auto focus:outline-none rounded "
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleClickToOpen(pro.review);
                            }}
                          >
                            Review
                          </Button>
                        )}

                        {pro.review.length === 0 && (
                          <Button
                            className="flex m-auto text-white border-0 py-auto px-auto focus:outline-none rounded "
                            variant="contained"
                            color="primary"
                            onClick={noData}
                          >
                            Review
                          </Button>
                        )}
                      </div>
                      <div className="flex">
                        <span className="font-medium text-2xl text-black left text-center py-2">
                          Price:{pro.charge}&nbsp;&#8377;
                        </span>
                        <Button
                          className="bcolor flex text-white border-0 py-auto px-auto focus:outline-none rounded "
                          variant="contained"
                          onClick={(e) => {
                            var data = { _id: pro._id };
                            history.push({
                              pathname: "/booking",
                              state: { data },
                            });
                          }}
                        >
                          Book
                        </Button>
                      </div>
                      <MDBCardText>
                        <p
                          style={{
                            color: "red",
                            fontSize: "small",
                            margin: "auto",
                          }}
                        >
                          (note:here mention is only visiting charge)
                        </p>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </div>
            </>
          );
        })}
      </MDBRow>
      <Footer />
    </>
  );
};

export default UserPestcontrol;
