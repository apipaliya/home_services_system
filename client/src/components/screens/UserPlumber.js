import React, { useState, useEffect, Card } from "react";
import UserNavBar from "./UserNavbar";
import Footer from "../Footer";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

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
const UserPlumber = () => {
  const history = useHistory();
  const [professionals, setProfessionals] = useState([
    {
      name: "",
      address: "",
      charge: "",
      profession: "",
      city: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    fetch("/plumberPro", {
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
      <MDBRow className="m-auto" style={{ backgroundColor: "#f2f2f2" }}>
        {professionals.map((pro, index) => {
          return (
            <>
              <div key={index}>
                <MDBCol
                  className="md-4"
                  style={{ maxWidth: "21rem",
                  padding: '1rem',
                  textAlign: 'center'
                   }}
                >
                  <MDBCard>
                    <MDBCardImage className="img-fluid" 
                    style={{
                      width: '307px',
                      height: '287px',
                      borderTopRightRadius: "1.25rem",
                      borderTopLeftRadius: "1.25rem",
                      margin: "auto",
                      overflow: "hidden",
                    }}
                    src={pro.image} waves />
                    <MDBCardBody>
                      <MDBCardTitle>{pro.name}</MDBCardTitle>
                      <MDBCardText>{pro.address}</MDBCardText>
                      <MDBCardText>{pro.zipcode}</MDBCardText>
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
                      value={pro.rating}
                      activeColor="#fbcd0a"
                    />
                  </div>
                      <div className="flex">
                        <span className="title-font font-medium text-2xl text-gray-900 left text-center py-2">
                          {pro.charge}&nbsp;Rupees/Hr
                        </span>
                        <MDBBtn
                          className="flex ml-auto text-white border-0 py-2 px-4 focus:outline-none hover:#1e88e5 rounded "
                          onClick={(e) => {
                            var data = { _id: pro._id };
                            history.push({
                              pathname: "/booking",
                              state: { data },
                            });
                          }}
                        >
                          Book
                        </MDBBtn>
                      </div>
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

export default UserPlumber;
