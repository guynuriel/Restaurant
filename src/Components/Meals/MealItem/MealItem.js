import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem(props) {
  const price = `$${props.meal.price.toFixed(2)}`;
  
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <p className={classes.description}>{props.meal.info}</p>
        <p className={classes.price}>{price}</p>
      </div>
      <div>
        <MealItemForm meal={props.meal} />
      </div>
    </li>
  );
}
export default MealItem;
