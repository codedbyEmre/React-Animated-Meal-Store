import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meal from './Meal';

const MealsByArea = () => {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);

  const getAreaByName = async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    const data = await res.json();
    setMeals(data.meals);
  };

  useEffect(() => {
    getAreaByName();
  }, [name]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
      {meals.map((meal, index) => (
        <Meal meal={meal} index={index} key={meal.idMeal} />
      ))}
    </div>
  );
};

export default MealsByArea;
