import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../App";
import NavBar from "../Navbar";
import Footer from "../Footer";

const LoginPro = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    if (
      !/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    fetch("/loginpro", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          M.toast({
            html: "signed in successfully",
            classes: "#43a047 green darken-1",
          });
          history.push("/profilepro");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <NavBar />
      <div className="mycard">
        <div className="card auth-card input-field">
          <h4>Helping Hands At Home</h4>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />
          <button
            className="btn waves-effect waves-light text-white blue darken-1"
            onClick={() => PostData()}
          >
            Login As A Professional
          </button>
          <h5 className='mt-2'>
            <Link to="/signuppro">Dont have an account ?</Link>
          </h5>
          <h6>
            <Link to="/userpro/reset">Forgot password ?</Link>
          </h6>
        </div>
      </div>
      
    </>
  );
};

export default LoginPro;
