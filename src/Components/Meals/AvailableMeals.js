import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import HttpRequest from "../../http/HttpRequest";
import { useEffect, useState } from "react";

function AvailableMeals() {
  const [IsLoading, setIsLoading] = useState(true);
  const [error , setError] = useState()
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const { response:meals, hasError } = await HttpRequest(
        "https://guydummydb-default-rtdb.firebaseio.com/meals.json"
      );

      if (hasError) {
        setError(hasError);
      }
      let list = [];
      for (let key in meals) {
        let meal = {
          id: key,
          name: meals[key].name,
          description: meals[key].description,
          price: meals[key].price,
        };
        list.push(meal);
      }
      setMeals(list);
      setIsLoading(false);
    };
    fetchMeals();
  }, []);

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }
  if (IsLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => {
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
