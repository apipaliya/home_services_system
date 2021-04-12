import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import { MDBContainer, MDBFooter } from "mdbreact";

const Contactus = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const senddata = (e) => {
    e.preventDefault();

    fetch("/contactusdata", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          M.toast({
            html: "Send Details successfully",
            classes: "#43a047 green darken-1",
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    
      {/* <!--Grid column--> */}
      <div className="col-lg-5 col-md-12 my-9 mx-auto card">
        {/* <!-- Form contact --> */}
        <form className="p-5 grey-text">
          <p className="h4 text-center blue-text">Contact Us</p>
          <div className="md-form form-sm">
            {" "}
            <i className="fas fa-user prefix"></i>
            <input
              type="text"
              id="form3"
              className="form-control form-control-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label for="form3">Your name</label>
          </div>
          <div className="md-form form-sm">
            {" "}
            <i className="fas fa-envelope prefix"></i>
            <input
              type="text"
              id="form2"
              className="form-control form-control-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="form2">Your email</label>
          </div>
          <div className="md-form form-sm">
            {" "}
            <i className="fas fa-tag prefix"></i>
            <input
              type="text"
              id="form32"
              className="form-control form-control-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label for="form34">Subject</label>
          </div>
          <div className="md-form form-sm">
            {" "}
            <i className="fas fa-pencil-alt prefix"></i>
            <textarea
              type="text"
              id="form8"
              className="md-textarea form-control form-control-sm"
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <label for="form8">Your message</label>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={(e) => senddata(e)}>
              Send <i className="far fa-paper-planeml-1"></i>
            </button>
          </div>
        </form>
        {/* <!-- Form contact --> */}
      </div>
      {/* <!--Grid column--> */}
      <MDBFooter
        color="#1e88e5 blue darken-1"
        className="font-small pt-0.5 mt-4 page-footer rounded-t-lg fixed bottom"
        style={{ right: 0, left: 0, overflow: 'hidden' }}
      >
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="/">www.HelpingHands.com</a>
          </MDBContainer>
        </div>
      </MDBFooter>
    </>
  );
};

export default Contactus;
