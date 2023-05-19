import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meal from './Meal';

const MealsByCategory = () => {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);

  const getCategoryByName = async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    const data = await res.json();
    setMeals(data.meals);
  };

  useEffect(() => {
    getCategoryByName();
  }, [name]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
      {meals.map((meal, index) => (
        <Meal meal={meal} index={index} key={meal.idMeal} />
      ))}
    </div>
  );
};

export default MealsByCategory;
