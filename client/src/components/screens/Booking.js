import React, { useState, useEffect, } from "react";
import Footer from "../Footer";
import UserNavBar from "./UserNavbar";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import {useLocation} from "react-router-dom";

const Booking = () => {
  const history = useHistory();
  const location = useLocation();
  const [dateTime, setDateTime] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [professionalsid, setProfessionalsid] = useState("");

  useEffect((req,res) => {
    var d1 = location.state.data;

    console.log("d1",d1._id);
    setProfessionalsid(d1._id);
     
  }, [location]);

  const senddata = (e) => {
    e.preventDefault();
    console.log(dateTime);
    console.log(address);

    fetch("/createBooking", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        dateTime,
        address,
        zipcode,
        professionalsid
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
          history.push("/userBookings");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("/userData", {
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
          setMobile(datadetail[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <UserNavBar />

      <MDBContainer md="3" className="w-50 card my-3">
        <MDBRow>
          
          <MDBCol md="10" className="mx-auto">
            <form>
              <p className="h4 text-center mb-4 my-10 blue-text">Appointment</p>
              <label for="street/area" className="blue-text">
                Street/Area*
              </label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <br />
              <label for="street/area" className="blue-text">
                ZipCode
              </label>
              <input
                type="text"
                className="form-control"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
              <br />
              <label for="phone" className="blue-text">
                Mobile No.*
              </label>
              <input type="text" className="form-control"
              value={mobile}
              onChange={(e)=> setMobile(e.target.value)}
              />
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <MDBContainer md="3" className="w-50 card my-3">
        <MDBRow>
          <MDBCol md="10" className="mx-auto">
            <form>
              
              <p className="h4 text-center mb-4 my-8 blue-text">Date & Time</p>
              <label className="birthdaytime blue-text">Select Date and Time*</label>
              <input
                type="datetime-local"
                id="daytime"
                name="daytime"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              ></input>

              <div className="text-center mt-4 m-auto p-auto">
                <MDBBtn
                  color="blue"
                  type="submit"
                  className="rounded"
                  onClick={(e) => senddata(e)}
                >
                  Next
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Footer />
    </>
  );
};

export default Booking;