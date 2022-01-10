import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    name: "Sushi",
    info: "Finest fish and veggies",
    price: 22.99,
    id: 'm1',
  },
  {
    name: "Schnitzel",
    info: "A german specialty",
    price: 16.5,
    id: 'm2',
  },
  {
    name: "Barbecue Burger",
    info: "American, raw, meaty",
    price: 12.99,
    id: 'm3',
  },
  {
    name: "Green Bowl",
    info: "Healthy...and green...",
    price: 18.99,
    id: 'm4',
  },
];
function AvailableMeals() {
  const mealsList = DUMMY_MEALS.map((meal) => {
    return <MealItem meal={meal} key={meal.id} />;
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
export default AvailableMeals;
