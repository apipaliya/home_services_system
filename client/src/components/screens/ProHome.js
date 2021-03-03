import React, { useState, useEffect } from "react";
import ProNavBar from "./ProNavbar";
import Switch from "react-switch";
import Footer from "../Footer";

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

      <div className="card auth-card">
        <div className="row no-gutters">
          <div className="col-auto">
            <img
              src={image}
              alt="Upload profile pic"
              className="img-fluid"
              width="200"
              height="200"
            />
          </div>
          <div className="col">
            <div className="card-block px-2">
              <h4 className="card-title">{name}</h4>
              <p className="card-text">{address}</p>
            </div>
          </div>
        </div>
        <div className="card-footer w-100 text-muted">
          <button type="submit" className="btn btn-primary">
            BUTTON
          </button>
        </div>
      </div>
      <div className="mycard">
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
      </div>
      <Footer/>
    </>
  );
};

export default ProHome;
