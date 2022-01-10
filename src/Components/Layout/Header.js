import { Fragment } from "react";
import classes from "./Header.module.css";
import MealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";


function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Restaurant</h1>
        <HeaderCartButton showCart={props.showCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={MealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
}

export default Header;
