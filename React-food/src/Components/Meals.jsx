import React, { useEffect, useState } from 'react';
import MealItem from './MealItem';

const Meals = () => {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() =>{
        const fetchMeals = async () =>{
            const response = await fetch("http://localhost:3000/meals");

            if(!response.ok){
                return;
            }
            const meals = await response.json();
            setLoadedMeals(meals);
        }
        fetchMeals();
    },[]);

  return (
    <div>
        <ul id='meals'>
            {
                loadedMeals.map(meal => <MealItem key={meal.id} meal={meal}/>)
            }
        </ul>
    </div>
  )
}

export default Meals
