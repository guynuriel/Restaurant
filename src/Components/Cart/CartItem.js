import { useContext } from "react";
import CartContext from "../../Context/CartContext";
import classes from './CartItem.module.css';

function CartItem(props) {
  const ctx = useContext(CartContext);
  const item = {
    name: props.item.name,
    price: props.item.price,
    amount: props.item.amount,
    id: props.item.id,
  };
  const addItem = { ...item, amount: 1 };

  const addItemsToList = () => {
    ctx.addItemsToList(addItem);
  };
  const removeItemsFromList = () => {
    console.log('0');
    ctx.removeItemsFromList(addItem);
  };

  return (
    <li className={classes['cart-item']}>
    <div>
      <h2>{item.name}</h2>
      <div className={classes.summary}>
        <span className={classes.price}>{item.price}</span>
        <span className={classes.amount}>x {item.amount}</span>
      </div>
    </div>
    <div className={classes.actions}>
      <button onClick={removeItemsFromList}>−</button>
      <button onClick={addItemsToList}>+</button>
    </div>
  </li>
  );
}

export default CartItem;
