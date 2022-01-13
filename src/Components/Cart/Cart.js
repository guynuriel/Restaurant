import { useContext, useState, useEffect } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../Context/CartContext";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CheckoutForm from "./CheckoutForm";
import HttpRequest from "../../http/HttpRequest";

function Cart(props) {
  const [isCheckoutForm, setIsCheckoutForm] = useState(false);
  const [isErrMessage, setIsErrMessage] = useState(false);
  const [isOrderCompletedMessage, setIsOrderCompletedMessage] = useState(null);

  const ctx = useContext(CartContext);
  const itemsList = ctx.itemsList;

  const orderComplete = async (clientData) => {
    let orderData = {
      clientName: clientData.name,
      clientID: clientData.id,
      order: itemsList,
      totalPrice: ctx.totalPrice,
      amountOfItems: ctx.amountOfItems,
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(orderData),
    };
    let res = await HttpRequest(
      "https://guydummydb-default-rtdb.firebaseio.com/orders.json",
      config
    );

    if (!res.hasError) {
      ctx.orderComplete();
      setIsOrderCompletedMessage("Order Completed!");
    } else {
      setIsOrderCompletedMessage(res.hasError);
    }
  };

  useEffect(() => {
    if (itemsList.length > 0) {
      setIsErrMessage(false);
    }
  }, [itemsList]);

  const checkout = () => {
    if (itemsList.length > 0) {
      setIsCheckoutForm(true);
    } else {
      setIsErrMessage(true);
    }
  };
  const cartItems =
    itemsList &&
    itemsList.map((item) => {
      return <CartItem key={item.id} item={item} />;
    });

  if (isOrderCompletedMessage) {
    return (
      <Modal onClose={props.hideCart}>
        <p>{isOrderCompletedMessage}</p>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.hideCart}>
            Close
          </button>
        </div>
      </Modal>
    );
  }
  return (
    <Modal onClose={props.hideCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>$ {ctx.totalPrice.toFixed(2)}</span>
      </div>
      {isCheckoutForm && (
        <CheckoutForm hideCart={props.hideCart} orderComplete={orderComplete} />
      )}
      {!isCheckoutForm && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.hideCart}>
            Close
          </button>
          <button onClick={checkout} className={classes.button}>
            Order
          </button>
        </div>
      )}
      {isErrMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          * The cart is empty! Please Add Products to the cart.
        </p>
      )}
    </Modal>
  );
}

export default Cart;
