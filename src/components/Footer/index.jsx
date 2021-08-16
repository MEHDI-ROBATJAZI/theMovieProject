import { UpCircleOutlined } from "@ant-design/icons";
import React from "react";
import classes from './footer.module.scss'

const Footer = () => {


  return (
    <div id={classes.footerStyles}>
      <div id={classes.glassFilters}>
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
            id={classes.upIcon}
            onMouseEnter={(e) => (e.target.style.color = "red")}
            onMouseLeave={(e) => (e.target.style.color = "rgb(91, 255, 50)")}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
