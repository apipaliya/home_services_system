import React, { useState, useEffect } from "react";
import ProNavBar from "./ProNavbar";
import Switch from "react-switch";
import Footer from "../Footer";
import M from "materialize-css";

import {
  MDBBtn,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";
import ReactStars from "react-rating-stars-component";


const ProHome = () => {
  const [charge, setCharge] = useState("");
  const [rating, setRating] = useState("");
  const [available, setAvailable] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [firsttime, setFirsttime] = useState(false);

  const handleChange = (checked) => {
    console.log(checked);
    setAvailable(checked);
  };

  const senddata = (e) => {
    e.preventDefault();
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
  }, [available]);

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
          setCharge(datadetail[0]);
          setAvailable(datadetail[1]);
          setName(datadetail[2]);
          setImage(datadetail[3]);
          setAddress(datadetail[4]);
          setRating(datadetail[5]);
          console.log(datadetail[5],"rating",rating);
          setFirsttime(true);
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ProNavBar />

      <MDBRow className="px-0" style={{ backgroundColor: "#f2f2f2" }}>
        <MDBCol className="my-5 mx-5" style={{ maxWidth: "22rem" }}>
          <MDBCard>
            <MDBCardImage className="img-fluid" src={image} waves />
            <MDBCardBody>
              <MDBCardTitle>{name}</MDBCardTitle>
              <MDBCardText>{address}</MDBCardText>
              <div
                    style={{
                      dispaly: "inline",
                      width: "150px",
                      margin: "auto",
                    }}
                  >
                    <ReactStars
                      style={{ dispaly: "inline", textAlign: "center" }}
                      count={5}
                      isHalf={true}
                      size={36}
                      edit={false}
                      value={rating}
                      activeColor="#fbcd0a"
                    />
                  </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900 left text-center py-2">
                  {charge}&nbsp;Rs/Hr
                </span>
                <MDBBtn
                  href="#"
                  className="flex ml-auto text-white border-0 py-2 px-4 focus:outline-none hover:#1e88e5 rounded "
                >
                  Book
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol className="my-5 mx-5" style={{ maxWidth: "22rem" }}>
          <MDBCard>
            <MDBCardBody>
              <h4>Price/Hr</h4>
              <div className="flex">
                <input
                  type="number"
                  placeholder="Amount"
                  value={charge}
                  onChange={(e) => setCharge(e.target.value)}
                ></input>
                <button
                  type="submit"
                  className="btn btn-primary px-2"
                  onClick={(e) => senddata(e)}
                >
                  Update
                </button>
              </div>
              <hr />
              <div className="center">
                <h6>
                  If you want to provide your service then kindly turn on below
                  switch.
                </h6>
                <label>
                  <span className="text-lg">Availablity</span>
                  <Switch
                    className="react-switch items-right -bottom-2 left-4"
                    checked={available}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <Footer />
    </>
  );
};

export default ProHome;
