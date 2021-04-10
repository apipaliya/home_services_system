import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import M from "materialize-css";
import ReactStars from "react-rating-stars-component";

import UserNavBar from "./UserNavbar";

const Feedback = () => {
  const history = useHistory();
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [professionalsid, setProfessionalsid] = useState("");

  useEffect(
    (req, res) => {
      var d2 = location.state.pid;

      console.log("d2", d2._pid);
      setProfessionalsid(d2._pid);
    },
    [location]
  );

  const senddata = (e) => {
    e.preventDefault();

    fetch("/feedbackData", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        review,
        rating,
        professionalsid,
      }),
    })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          res.json()
          M.toast({
            html: "Send Details successfully",
            classes: "#43a047 green darken-1",
          });
          history.push("/userHome");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
  
    <>
      <UserNavBar />
      {/* <!--Grid column--> */}
      <div className="col-lg-5 col-md-12 my-9 mx-auto card">
        {/* <!-- Form contact --> */}
        <form className="p-5 grey-text">
          <p className="h4 text-center blue-text">Feedback</p>
          <div className="md-form form-sm">
            {" "}
            <i className="fas fa-pencil-alt prefix"></i>
            <textarea
              type="text"
              id="form8"
              className="md-textarea form-control form-control-sm"
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <label for="form8">Your Review</label>
          </div>
          <span className=""> Ratings </span>

          <ReactStars
            style={{ dispaly: "-webkit-inline-box", text: "center" }}
            count={5}
            isHalf={true}
            size={36}
            edit={true}
            value={rating}
            activeColor="#fbcd0a"
            onChange={(newRating) => {
              setRating(newRating);
            }}
          />

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => senddata(e)}
            >
              Submit <i className="far fa-paper-planeml-1"></i>
            </button>
          </div>
        </form>
        {/* <!-- Form contact --> */}
      </div>
      {/* <!--Grid column--> */}
    </>
  );
};

export default Feedback;
