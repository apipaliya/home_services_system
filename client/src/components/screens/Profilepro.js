import React, { useState, useEffect } from "react";
import ProNavBar from "./ProNavbar";
import Switch from "react-switch";
import Footer from "../Footer";
import M from "materialize-css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import {
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBView,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";

const ProfilePro = () => {
  const [charge, setCharge] = useState("");
  const [rating, setRating] = useState("");
  const [available, setAvailable] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [review, setReview] = useState([]);
  const [firsttime, setFirsttime] = useState(false);
  const [url, setUrl] = useState("");

  const handleChange = (checked) => {
    console.log(checked);
    setAvailable(checked);
  };

  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
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

  const postDetails = () => {
    console.log("Method called");
    document.getElementById("buttn").innerHTML = "Uploading...";
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "professional");
    data.append("cloud_name", "hhah");
    fetch("https://api.cloudinary.com/v1_1/hhah/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log("dataImg", data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const senddata = (c) => {
    c.preventDefault();
    console.log(charge);
    console.log(available);

    fetch("/updatecharge", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        charge,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          M.toast({
            html: "Update Details successfully",
            classes: "#43a047 green darken-1",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateData = (e) => {
    e.preventDefault();
    console.log(charge);
    console.log(available);

    fetch("/updateProfile", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        mobile,
        address,
        city,
        zipcode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          M.toast({
            html: "Uplode profile successfully",
            classes: "#43a047 green darken-1",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (firsttime) {
      fetch("/updateAvailable", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          available,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [available, firsttime]);

  useEffect(() => {
    if (url) {
      fetch("/profileImg", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          image: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            M.toast({
              html: "Update Profile Picture successfully",
              classes: "#43a047 green darken-1",
            });
            history.push("/profilepro");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history, url]);

  useEffect(() => {
    fetch("/charge", {
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
          console.log(datadetail);
          setRating(datadetail[7]);
          setCharge(datadetail[0]);
          setAvailable(datadetail[1]);
          setName(datadetail[2]);
          setImage(datadetail[3]);
          setAddress(datadetail[4]);
          setZipcode(datadetail[5]);
          setReview(datadetail[6]);
          setCity(datadetail[8]);
          setMobile(datadetail[9]);
          console.log(datadetail[7], "rating", rating);
          setFirsttime(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rating]);

  return (
    <>
      <ProNavBar />
      <br />
      <div className="content">
        <div className="container-fluid">
          <div className="row mx-auto py-auto">
            <div className="col-md-8">
              <div className="card">
                <div
                  className="card-header card-header-icon card-header-rose"
                  style={{
                    borderTopRightRadius: "1.25rem",
                    borderTopLeftRadius: "1.25rem",
                    color: "white",
                    backgroundColor: "#1e88e5",
                  }}
                >
                  <h4 className="card-title m-auto p-auto">
                    Edit Profile -
                    <small className="category">Complete your profile</small>
                  </h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            Mobile No:
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">City</label>
                          <input
                            type="text"
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <center>
                      <button
                        type="submit"
                        className="btn btn-primary px-auto m-auto rounded"
                        onClick={(e) => updateData(e)}
                      >
                        Update Profile
                      </button>
                    </center>
                    <hr />
                    <div className="row my-auto ">
                      <div className="col-md-3">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            Price/visit
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={charge}
                            onChange={(c) => setCharge(c.target.value)}
                          />
                          <center>
                            <button
                              type="submit"
                              className="btn btn-primary px-auto m-auto
                              rounded"
                              onClick={(c) => senddata(c)}
                            >
                              Update
                            </button>
                          </center>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            Available
                          </label>
                          <h6>
                            If you want to provide your service then kindly turn
                            on below switch.
                          </h6>

                          <center>
                            <label>
                              <Switch
                                className="react-switch items-right -bottom-2 left-4"
                                checked={available}
                                onChange={handleChange}
                              />
                            </label>
                          </center>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group bmd-form-group">
                          <label className="bmd-label-floating">
                            Upload Profile Picture
                          </label>
                          <input
                            type="file"
                            className="border-2 rounded-right btn-mdb-color"
                            id="exampleFormControlFile1"
                            onChange={(e) => {
                              setImage(e.target.files[0]);
                            }}
                          />
                          <center>
                            <button
                              className="btn btn-primary mt-3
                              rounded"
                              id="buttn"
                              onClick={(e) => {
                                e.preventDefault();
                                postDetails();
                              }}
                            >
                              Upload
                            </button>
                          </center>
                        </div>
                      </div>
                    </div>

                    <div className="clearfix" />
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <MDBCol
                style={{
                  maxWidth: "22rem",
                  textAlign: "center",
                  marginLeft: "2rem",
                }}
              >
                <MDBCard>
                  <MDBCardImage
                    className="img-fluid"
                    style={{
                      width: "308px",
                      height: "267px",
                      borderTopRightRadius: "1.25rem",
                      borderTopLeftRadius: "1.25rem",
                      margin: "auto",
                      overflow: "hidden",
                    }}
                    src={image}
                    waves
                  />
                  <MDBCardBody>
                    <MDBCardTitle>{name}</MDBCardTitle>
                    <MDBCardText
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      {address}
                    </MDBCardText>
                    <MDBCardText
                      style={{
                        color: "green",
                        fontSize: "1rem",
                        fontWeight: "500",
                        margin: "auto",
                      }}
                    >
                      Pincode:{zipcode}
                    </MDBCardText>
                    <div className="flex">
                      <span className=" left text-center py-2 mr-2">
                        <ReactStars
                          count={5}
                          isHalf={true}
                          size={36}
                          edit={false}
                          value={rating}
                          activeColor="#fbcd0a"
                        />
                      </span>

                      {review.length !== 0 && (
                        <Button
                          className="flex m-auto text-white border-0 py-auto px-auto focus:outline-none rounded "
                          variant="contained"
                          color="primary"
                          onClick={handleClickToOpen}
                        >
                          Review
                        </Button>
                      )}

                      {review.length === 0 && (
                        <Button
                          className="flex m-auto text-white border-0 py-auto px-auto focus:outline-none rounded "
                          variant="contained"
                          color="primary"
                          onClick={noData}
                        >
                          Review
                        </Button>
                      )}

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
                            {review.map((m) => (
                              <ul>
                                {" "}
                                <li> -&gt; {m} </li>{" "}
                              </ul>
                            ))}
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
                    </div>
                    <div className="flex">
                      <span className="font-medium text-2xl text-black left text-center py-2">
                        Price:{charge}&nbsp;&#8377;
                      </span>
                      <Button
                        className="bcolor flex text-white border-0 py-auto px-auto focus:outline-none rounded "
                        variant="contained"
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
          </div>
        </div>
      </div>
      <Footer />
     
    </>
  );
};

export default ProfilePro;
