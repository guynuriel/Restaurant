import { useContext,useState,useEffect } from "react";
import CartContext from "../../Context/CartContext";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const cxt = useContext(CartContext);
  const [isButtonActive,setIsButtonActive] = useState(false)
  const buttonClasses = `${classes.button}  ${ isButtonActive && classes.bump}`
  useEffect(() => {
    if (cxt.itemsList.length === 0) {
      return
    }

    setIsButtonActive(true)

    let timer = setTimeout(() => {
      setIsButtonActive(false)
    }, 300)
    return () => {
      clearTimeout(timer);
    }
  },[cxt.itemsList])

  return (
    <button onClick={props.showCart} className={buttonClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cxt.amountOfItems}</span>
    </button>
  );
}

export default HeaderCartButton;
