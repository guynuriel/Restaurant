import { Fragment } from "react";
// import Card from "../UI/Card";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from './MealsSummary';


function Meals() {
  

  return (
      <Fragment>
          <MealsSummary />
          <AvailableMeals/>
    </Fragment>
  );
}
export default Meals;
