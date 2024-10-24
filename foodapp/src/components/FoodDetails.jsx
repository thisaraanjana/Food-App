import { useEffect, useState } from "react";
export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "a0a06182dc424d779dabca5adb164c79";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      console.log(foodId);
      setFood(data);
    }
    fetchFood();
  }, [foodId]); //identify fod is change and code is do change that details
  return (
    <div>
      <div>
        <h1>{food.title}</h1>

        <img src={food.image} alt="" />
      </div>
      <span>
        <strong>{food.readyInMinutes} Minutes</strong>
      </span>
      {/* <span>{food.vegetarian ? "vegetarian":"Non-vegetarian"}</span> */}
    </div>
  );
}
