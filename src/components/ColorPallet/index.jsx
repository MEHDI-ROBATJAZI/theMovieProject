import React from "react";
import classes from "./index.module.scss";

const ColorPallet = ({ siteBackgrounds, changeBackground }) => {





  return (
    <div id={classes.palletBox}>
      {siteBackgrounds.map((pallet) => (
        <div
          key={pallet.color}
          style={{ background: pallet.color }}
          className={classes.colorBox}
          onClick={() => changeBackground(pallet)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPallet;
