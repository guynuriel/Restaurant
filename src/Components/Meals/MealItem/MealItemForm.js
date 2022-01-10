import classes from "./MealItemForm.module.css";
import { useContext, useRef } from "react";
import CartContext from "../../../Context/CartContext";
import Input from "../../UI/Input";

function MealItemForm(props) {
  const ctx = useContext(CartContext);
  const amountInputRef = useRef();

  const addToCart = (event) => {
    event.preventDefault();

    const currentAmount = +amountInputRef.current.value;
    if (currentAmount > 0 || currentAmount < 6) {
      const meal = {
        name: props.meal.name,
        price: props.meal.price,
        amount: +currentAmount,
        id: props.meal.id,
      };
      ctx.addItemsToList(meal);
    } 
  };
  const input = {
    id: "amount" + props.meal.id,
    type: "number",
    defaultValue: "1",
    min: "1",
    max: "5",
    step: "1",
  };

  return (
    <form className={classes.form} onSubmit={addToCart}>
      <div>
        <label htmlFor="amount">Amount</label>
        <Input ref={amountInputRef} label="Amount" input={input} />
      </div>
      <button type="submit">+ Add</button>
    </form>
  );
}

export default MealItemForm;
