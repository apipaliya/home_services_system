import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import M from "materialize-css";

const Payment = () => {
  const history = useHistory();
  const location = useLocation();
  const [payamount, setPayamount] = useState();
  const [description, setDescription] = useState("");
  const [professionalsid, setProfessionalsid] = useState("");
  const [bookingid, setBookingid] = useState("");
  const [nAmount, setNAmount] = useState("");
  const [npaymentid, setNpaymentid] = useState("");

//   const [isdateset, setIsdateset] = useState(false);
//   useEffect(() => {
//     var d2 = { bookingid: bookingid };
//     if (isdateset) {
//       fetch("/razorpay/setDescription", {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           bookingid: d2.bookingid,
//           description,
//           payamount: nAmount,
//         }),
//       })
//         .then((res) => res.json())
//         .then((data) => {})
//         .catch((err) => console.log(err));
//     }
//   }, [isdateset]);

  useEffect(
    (req, res) => {
      var bid = location.state.b1;
      console.log("bid", bid._bid);
      setBookingid(bid._bid);
    },
    [location]
  );

  return (
    <>
      {/* <!--Grid column--> */}
      <div className="col-lg-5 col-md-12 my-9 mx-auto card">
        {/* <!-- Form contact --> */}
        <form className="p-5 grey-text">
          <p className="h4 text-center blue-text">Invoice</p>
          <div className="md-form form-sm">
            {" "}
            <i className="fas fa-user prefix"></i>
            <input
              type="number"
              id="form3"
              className="form-control form-control-sm"
              value={payamount}
              onChange={(e) => setPayamount(e.target.value)}
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
                // setIsdateset(true);
                fetch("/workSuccess", {
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                  },
                  body: JSON.stringify({
                    _id: bookingid,
                    payamount,
                    description,
                  }),
                })
                  .then((res) => {
                    if (res.error) {
                      console.log(res.error);
                    } else {
                      res.json();
                      M.toast({
                        html: "Invoice generated successfully",
                        classes: "#43a047 green darken-1",
                      });
                     
                      history.push("/proTransaction");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Generate<i className="far fa-paper-planeml-1"></i>
            </button>
          </div>
        </form>
        {/* <!-- Form contact --> */}
      </div>
      {/* <!--Grid column--> */}
    </>
  );
};

export default Payment;
