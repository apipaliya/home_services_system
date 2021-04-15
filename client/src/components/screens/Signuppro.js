import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import NavBar from "../Navbar";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    textAlign: "left",
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

const Signuppro = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [mobile, setMobile] = useState("");
  const [profession, setProfession] = React.useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    setProfession(event.target.value);
  };

  const PostData = () => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    fetch("/signuppro", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        mobile,
        profession,
        zipcode,
        city,
        address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push("/loginpro");
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
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />
          <input
            type="number"
            placeholder="Mobile No."
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Profession
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={profession}
              onChange={handleChange}
              className={classes.selectEmpty}
            >
              <MenuItem value={"Carpenter"}>Carpenter</MenuItem>
              <MenuItem value={"Electrician"}>Electrician</MenuItem>
              <MenuItem value={"Pest Control"}>Pest Control</MenuItem>
              <MenuItem value={"Plumber"}>Plumber</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            className="btn waves-effect waves-light text-white blue darken-1"
            onClick={() => PostData()}
          >
            Register As A Professional
          </button>
          <h5 className='mt-2'>
            <Link to="/loginpro">Already have an account ?</Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Signuppro;
