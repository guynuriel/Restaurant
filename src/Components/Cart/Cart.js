import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../Context/CartContext";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

function Cart(props) {
  const ctx = useContext(CartContext);
  const itemsList = ctx.itemsList;

  const cartItems =
    itemsList &&
    itemsList.map((item) => {
      return <CartItem key={item.id} item={item} />;
    });
  return (
    <Modal onClose={props.hideCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>$ {ctx.totalPrice.toFixed(2)}</span>
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.hideCart}>
          Close
        </button>
        <button className={classes.button} onClick={ctx.orderComplete}>
          Order
        </button>
      </div>
    </Modal>
  );
}

export default Cart;
