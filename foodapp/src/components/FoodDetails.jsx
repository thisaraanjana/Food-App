import { useEffect, useState } from "react";
export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "a0a06182dc424d779dabca5adb164c79";
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
    <div>
      <div>
        <h1>{food.title}</h1>

        <img src={food.image} alt="" />
      </div>
      <div>
        <span>
          <strong>{food.readyInMinutes} Minutes</strong>
        </span>
        <span> Serves{food.servings} people</span>
        <span>{food.vegetarian ? " vegetarian" : " Non-vegetarian"}</span>
        <span>{food.vegan ? "  vegan" : "  non-vegan"}</span>
      </div>
      <div>
        <span>${food.pricePerServing}</span>
      </div>
      <div>
        <h3>Instruction</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          food.analyzedInstructions[0].steps.map((step) => <li>{step.step}</li>)
        )}
      </div>
    </div>
  );
}
