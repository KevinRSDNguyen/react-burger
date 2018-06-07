import React from "react";

import burgerLogo from "./../../assets/images/burger-logo.png";
//Will just be a path to the image that webpack will compile later on
import classes from "./Logo.css";

const logo = props => {
  return (
    <div className={classes.Logo} style={{ height: props.height }}>
      <img src={burgerLogo} alt="MyBurger" />
    </div>
  );
};

export default logo;
