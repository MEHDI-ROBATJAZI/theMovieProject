import React from "react";

const footerStyles = {
  margin: "30px 10px",
  textAlign: "center",
  fontFamily: "Montserrat",
};

const glassFilters = {
  background: "#ff604473",
  boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 4px )",
  WebkitBackdropFilter: "blur( 4px )",
  borderRadius: "10px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
};

const Footer = () => {
  return (
    <div style={footerStyles}>
      <div style={glassFilters}>
        <ul style={{ listStyle: "none", padding: "10px 0" }}>
          <li>&copy; 2021 Mahdi Robatjazi</li>
          <li>
            created by{" "}
            <a href="https://ant.design/" target="_blank">
              Ant Design System
            </a>
          </li>

          <li>
            and{" "}
            <a href="https://www.themoviedb.org/" target="_blank">
              {" "}
              tmdb api
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
