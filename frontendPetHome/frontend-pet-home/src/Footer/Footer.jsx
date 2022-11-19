import React from "react";
import './Footer.css'

const Footer = () => (
  <div className="footer">
    <p style={{textAlign:'center'}}>©PetHome {new Date().getFullYear()}, Ukraine.</p>
    <p style={{textAlign:'center'}}>Contact us petHome@gmail.com</p>
  </div>
);

export default Footer;
