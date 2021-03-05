import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="#1e88e5 blue darken-1" className="font-small pt-0.5 mt-4 footer">

      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="/">www.HelpingHands.com</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}


export default Footer;