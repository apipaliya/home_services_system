import React, { useState, useEffect } from "react";
import ProNavBar from "./ProNavbar";
import { useHistory } from "react-router-dom";
import Footer from "../Footer";
import { MDBView } from "mdbreact";
import M from "materialize-css";

const ProfilePro = () => {
  const history = useHistory();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [data, setdata] = useState([
    {
      name: "",
      state: "",
      city: "",
      address: "",
      email: "",
      image: "",
      profession: "",
    },
  ]);

  useEffect(() => {
    if (url) {
      fetch("/profilepro", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          image: url,
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
            history.push("/proHome");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  useEffect(() => {
    fetch("/profilepro", {
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
          setdata(datadetail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postDetails = () => {
    console.log("Method called");
    document.getElementById("buttn").innerHTML = "Uploading...";
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "professional");
    data.append("cloud_name", "hhah");
    fetch("https://api.cloudinary.com/v1_1/hhah/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ProNavBar />

      <div className="container my-5">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3"></div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body text-center font-bold">
                  <div className="d-flex flex-column align-items-center text-center">
                    <MDBView hover zoom>
                      <img
                        src={data.image}
                        alt="Upload profile pic"
                        className="rounded-circle img"
                        width="200"
                        height="200"
                      />
                    </MDBView>
                  </div>
                  <hr />
                  {data.name}
                </div>
              </div>
              <div className="card mt-3">
                <div className="form-group">
                  <center>
                    <label htmlFor="exampleFormControlFile1">
                      <b>Upload image</b>
                    </label>

                    <input
                      type="file"
                      className="border-2 rounded-right btn-mdb-color"
                      id="exampleFormControlFile1"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />

                    <button
                      className="btn btn-primary mt-3 rounded"
                      id="buttn"
                      onClick={() => postDetails()}
                    >
                      Upload
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProfilePro;
