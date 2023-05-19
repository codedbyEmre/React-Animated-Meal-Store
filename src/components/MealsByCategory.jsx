import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        <motion.div
          key={meal.idMeal}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'tween', duration: 0.75, delay: 0.1 * index, ease: [0.25, 0.25, 0.25, 0.75] }}
          className="rounded-lg overflow-hidden shadow-lg bg-white"
        >
          <img className="w-full max-h-60 object-cover" src={meal.strMealThumb} alt={meal.strMeal} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl text-gray-700">{meal.strMeal}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MealsByCategory;
