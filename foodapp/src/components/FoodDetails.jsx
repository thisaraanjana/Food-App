import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";
export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "e567d41f25dc4ff9a0bc9d3b22a5fa10";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      console.log(foodId);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]); //identify fod is change and code is do change that details
  return (
    <div className={styles.recipeCard}>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>This is enargy food{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
      </div>
      <div className={styles.recipeDetails}>
        <span>
          <strong>{food.readyInMinutes} Minutes</strong>
        </span>
        <span>
          <strong> Serves{food.servings} number of peoples</strong>
        </span>
        <span>
          <strong>{food.vegetarian ? " vegetarian" : " Non-vegetarian"}</strong>
        </span>
        <span>
          <strong>{food.vegan ? "  vegan" : "  non-vegan"}</strong>
        </span>
      </div>
      <div>
        <span>
          <strong>${food.pricePerServing}</strong>
        </span>
      </div>
      <h2>Ingredients</h2>
     <ItemList food={food} isLoading={isLoading} />
      <h3>Instruction</h3>
      <div className={styles.recipeInstructions}>
        <ol>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            food.analyzedInstructions[0].steps.map((step) => (
              <li>{step.step}</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
