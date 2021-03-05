import React, { useState, useEffect } from "react";
import ProNavBar from "./ProNavbar";
import Switch from "react-switch";
import Footer from "../Footer";
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

const ProHome = () => {
  const [charge, setCharge] = useState("");
  const [available, setAvailable] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const handleChange = (nextChecked) => {
    setAvailable(nextChecked);
  };
  const senddata = (e) => {
    e.preventDefault();
    console.log(charge);

    fetch("/updatecharge", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        charge,
        available,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          alert("Update Details successfully.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
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
          alert("Update Details successfully.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900 left text-center py-2">
                      {charge}&nbsp;Rupees/Hr
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
          <input
            type="number"
            placeholder="Amount"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
          ></input>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => senddata(e)}
          >
            Update
          </button>
          <hr/>
          <div>
            <label>
              <span>Switch with default style</span>
              <Switch
                onChange={handleChange}
                checked={available}
                className="react-switch items-right"
              />
            </label>
          </div>
          </MDBCardBody>
          </MDBCard>
          </MDBCol>
      </MDBRow>

    

      {/* <div className="mycard">
        <div className="card auth-card input-field">
          <h4>Price/Hr</h4>
          <input
            type="number"
            // placeholder="Amount"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
          ></input>
          <div>
            <label>
              <span>Switch with default style</span>
              <Switch
                onChange={handleChange}
                checked={available}
                className="react-switch"
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => senddata(e)}
          >
            Update
          </button>
        </div>
      </div> */}
      <Footer/>
    </>
  );
};

export default ProHome;
