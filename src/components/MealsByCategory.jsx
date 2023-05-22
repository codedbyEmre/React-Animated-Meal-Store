import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meal from './Meal';

const MealsByCategory = () => {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryByName = async () => {
    setMeals([]);
    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
      const data = await res.json();
      setMeals(data.meals);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryByName();
  }, [name]);

  const mealInfoTextOne = meals.length > 1 ? 'have' : 'has';
  const mealInfoTextTwo = meals.length > 1 ? 'meals' : 'meal';

  return (
    <>
      {loading ? (
        <h2 className="text-2xl sm:text-left text-center">Loading...</h2>
      ) : meals && meals.length ? (
        <>
          <h2 className="text-2xl mb-6 sm:text-left text-center font-semibold">
            {name} <span className="font-normal">{mealInfoTextOne}</span> {meals.length}
            <span className="font-normal ml-2">{mealInfoTextTwo}</span>
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {meals.map((meal, index) => (
              <Meal meal={meal} index={index} key={meal.idMeal} />
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-2xl sm:text-left text-center">No meals found</h2>
      )}
    </>
  );
};

export default MealsByCategory;
