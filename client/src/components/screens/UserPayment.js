import UserNavBar from "./UserNavbar";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import M from "materialize-css";
import Axios from "axios";

const UserPayment = () => {
  const history = useHistory();
  const location = useLocation();
  const [payamount, setPayamount] = useState();
  const [description, setDescription] = useState("");
  const [professionalsid, setProfessionalsid] = useState("");
  const [bookingid, setBookingid] = useState("");
  const [nAmount, setNAmount] = useState("");
  const [npaymentid, setNpaymentid] = useState("");

  const [isdateset, setIsdateset] = useState(false);
  useEffect(() => {
    var d2 = { bookingid: bookingid };
    if (isdateset) {
      fetch("/razorpay/setDescription", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingid: d2.bookingid,
          description,
        }),
      })
        .then((res) => res.json())
        .then((data) => {})
        .catch((err) => console.log(err));
    }
  }, [isdateset]);

  useEffect(
    (req, res) => {
      var pid = location.state.p1;
      var bid = location.state.b1;
      console.log("pid", pid._pid);
      console.log("bid", bid._bid);
      setProfessionalsid(pid._pid);
      setBookingid(bid._bid);
    },
    [location]
  );

  async function razorPayPaymentHandler() {
    var d1 = { bookingid: bookingid, Amount: nAmount, paymentid: npaymentid };
    const API_URL = `http://localhost:8000/razorpay/`;
    const orderUrl = `${API_URL}order`;
    const response = await Axios.post(orderUrl, d1);
    const { data } = response;

    const options = {
      key: "",
      name: "Helping Hands At Home",
      description: d1.bookingid,
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
          const captureResponse = await Axios.post(url, d1);
          const successObj = JSON.parse(captureResponse.data);
          const captured = successObj.captured;
          if (captured) {
            M.toast({
              html: "Payment successfull",
              classes: "#43a047 green darken-1",
            });
            var pid = { _pid: professionalsid };
            console.log("pid", pid);
            history.push({
              pathname: "/userFeedback",
              state: { pid },
            });
          } else {
            M.toast({
              html: "Payment Failed,Try again",
              classes: "#43a047 red darken-1",
            });
          }
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", function (response) {
      M.toast({
        html: "Payment Failed,Try again",
        classes: "#43a047 red darken-1",
      });
    });
  }

  return (
    <>
      <UserNavBar />
      {/* <!--Grid column--> */}
      <div className="col-lg-5 col-md-12 my-9 mx-auto card">
        {/* <!-- Form contact --> */}
        <form className="p-5 grey-text">
          <p className="h4 text-center blue-text">Payment</p>
          <div className="md-form form-sm">
            {" "}
            <i className="fas fa-user prefix"></i>
            <input
              type="number"
              id="form3"
              className="form-control form-control-sm"
              value={nAmount}
              onChange={(e) => setNAmount(e.target.value)}
            />
            <label for="form3">Amount</label>
          </div>
          <div className="md-form form-sm">
            {" "}
            <i className="fas fa-pencil-alt prefix"></i>
            <textarea
              type="text"
              id="form8"
              className="md-textarea form-control form-control-sm"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label for="form8">Description</label>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                setIsdateset(true);
                razorPayPaymentHandler();
                // fetch("/workSuccess", {
                //   method: "post",
                //   headers: {
                //     "Content-Type": "application/json",
                //     Authorization: "Bearer " + localStorage.getItem("jwt"),
                //   },
                //   body: JSON.stringify({
                //     _id:bookingid,
                //     payamount,
                //     description,
                //   }),
                // })
                //   .then((res) => {
                //     if (res.error) {
                //       console.log(res.error);
                //     } else {
                //       res.json();
                //       M.toast({
                //         html: "Payment successfull",
                //         classes: "#43a047 green darken-1",
                //       });
                //       var pid = { _pid: professionalsid };
                //       console.log("pid", pid);
                //       history.push({
                //         pathname: "/userFeedback",
                //         state: { pid },
                //       });
                //     }
                //   })
                //   .catch((err) => {
                //     console.log(err);
                //   });
              }}
            >
              Pay Now<i className="far fa-paper-planeml-1"></i>
            </button>
          </div>
        </form>
        {/* <!-- Form contact --> */}
      </div>
      {/* <!--Grid column--> */}
    </>
  );
};

export default UserPayment;
