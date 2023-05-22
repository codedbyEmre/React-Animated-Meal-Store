import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meal from './Meal';

const MealsByIngredient = () => {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryByName = async () => {
    setMeals([]);
    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
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

  let mealInfoText = (meals && meals.length) > 1 ? 'meals that contain' : 'meal that contains';

  return (
    <>
      {loading ? (
        <h2 className="text-2xl sm:text-left text-center">Loading...</h2>
      ) : meals && meals.length ? (
        <>
          <h2 className="text-2xl mb-6 sm:text-left text-center">
            <span className="font-semibold">{meals.length}</span> {mealInfoText}
            <span className="font-semibold ml-2">{name}</span>
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

export default MealsByIngredient;
