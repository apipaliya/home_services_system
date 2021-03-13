import React, { useState, useEffect, Card } from "react";
import UserNavBar from "./UserNavbar";
import Footer from "../Footer";
import { useHistory } from "react-router-dom";

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


const UserElectrician = () => {

 
  const history = useHistory();
  
  const [professionals, setProfessionals] = useState([
    {
      name: "",
      address: "",
      charge: "",
      profession: "",
      city: "",
      _id:""
    },
  ]);

 

  useEffect(() => {
    fetch("/electricianPro", {
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
      <MDBRow className="px-0" style={{ backgroundColor: "#f2f2f2" }}>
        {professionals.map((shop, index) => {
         return(
           <>
          <div key={index}>
            <MDBCol className="my-4 mb-2 ml-8" style={{ maxWidth: "22rem" }}>
              <MDBCard>
                <MDBCardImage className="img-fluid" src={shop.image} waves />
                <MDBCardBody>
                  <MDBCardTitle>{shop.name}</MDBCardTitle>
                  <MDBCardText>{shop.address}</MDBCardText>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900 left text-center py-2">
                      {shop.charge}&nbsp;Rupees/Hr
                    </span>
                    <MDBBtn
                     
                      className="flex ml-auto text-white border-0 py-2 px-4 focus:outline-none hover:#1e88e5 rounded "
                      onClick={(e)=>{
                        var data = {_id:shop._id};
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
         )
})}
      </MDBRow>
      <Footer/>
    </>
  );
};

export default UserElectrician;
