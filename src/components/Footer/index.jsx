import { UpCircleOutlined } from "@ant-design/icons";
import React from "react";
import useResponsive from "../../hooks/useResponsive";

const Footer = () => {
  const width = useResponsive();

  const glassFilters = {
    background: "#a19eda",
    boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 4px )",
    WebkitBackdropFilter: "blur( 4px )",
    borderRadius: "10px",
    border: "2px solid rgb(91, 255, 50)"
  };

  const footerStyles = {
    margin: width < 1000 ? "30px 10px" : "30px 70px",
    textAlign: "center",
    fontFamily: "Montserrat",
    height: "140px",
    position: "relative",
  };

  const upIcon = {
    color: "rgb(91, 255, 50)",
    fontSize: "3rem",
    position: "absolute",
    top: "30px",
    right: "30px",
  };

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
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <UpCircleOutlined
            style={upIcon}
            onMouseEnter={(e) => (e.target.style.color = "red")}
            onMouseLeave={(e) => (e.target.style.color = "rgb(91, 255, 50)")}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
