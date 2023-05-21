import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ViewHome = () => {
  const [meal, setMeal] = useState([]);

  const getMeal = async () => {
    setMeal([]);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
      const data = await res.json();
      setMeal(data.meals[0]);
    } catch (err) {}
  };

  useEffect(() => {
    getMeal();
  }, []);

  return (
    <>
      <div className="text-4xl font-medium mt-6">
        <motion.i
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'tween', duration: 0.75, delay: 0.35, ease: [0.25, 0.25, 0.25, 0.75] }}
          className="text-primary text-6xl mb-2"
        >
          Nourish Your Palate
        </motion.i>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'tween', duration: 0.75, delay: 0.55, ease: [0.25, 0.25, 0.25, 0.75] }}
          className="mt-2"
        >
          Discover the Perfect Blend of Flavor and Efficiency
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, translateY: '-1rem' }}
        animate={{ opacity: 1, translateY: '0' }}
        transition={{ type: 'tween', duration: 0.75, delay: 0.75, ease: [0.25, 0.25, 0.25, 0.75] }}
        className="card lg:card-side bg-base-100 shadow-xl lg:h-[25rem] mt-16"
      >
        {/* Meal Image */}
        <figure className="flex-1">
          <img src={meal?.strMealThumb} alt={meal?.strMeal} className="w-full h-full object-cover" />
        </figure>
        {/* Meal Details */}
        <div className="flex-1 p-8">
          <h2 className="card-title text-4xl line-clamp-1 mb-6">{meal?.strMeal}</h2>
          {/* Category and Area */}
          <p>
            Category: <span className="font-semibold">{meal?.strCategory}</span>
          </p>
          <p className="mt-1">
            Area: <span className="font-semibold">{meal?.strArea}</span>
          </p>
          {/* Instructions */}
          <h2 className="font-semibold mt-3 mb-1 text-lg">Instructions</h2>
          <p className="line-clamp-4">{meal?.strInstructions}</p>
          {/* View More Btn */}
          <button className="btn btn-primary mt-6">
            <Link to={`/meal/${meal.idMeal}`}>View Detail</Link>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ViewHome;
