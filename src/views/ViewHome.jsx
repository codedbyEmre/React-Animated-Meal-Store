import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ViewHome = () => {
  const [meal, setMeal] = useState([]);

  const getMeal = async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await res.json();
    console.log('data :>> ', data.meals[0]);
    setMeal(data.meals[0]);
  };

  useEffect(() => {
    getMeal();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: '0' }}
      animate={{ opacity: 1, scale: '1' }}
      transition={{ type: 'tween', duration: 1, delay: 0.2, ease: [0.25, 0.25, 0.25, 0.75] }}
      className="hero min-h-[60vh] rounded-lg overflow-hidden"
      style={{ backgroundImage: `url("${meal.strMealThumb}")` }}
    >
      <div className="hero-overlay bg-[#111] bg-opacity-70"></div>
      <div className="hero-content text-neutral-content ">
        <div className="px-4">
          <motion.h1
            initial={{ opacity: 0, translateY: '-1rem' }}
            animate={{ opacity: 1, translateY: '0' }}
            transition={{ type: 'tween', duration: 0.5, delay: 0.25, ease: [0.25, 0.25, 0.25, 0.75] }}
            className="mb-5 text-6xl font-bold"
          >
            {meal.strMeal}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, translateY: '-1rem' }}
            animate={{ opacity: 1, translateY: '0' }}
            transition={{ type: 'tween', duration: 0.5, delay: 0.5, ease: [0.25, 0.25, 0.25, 0.75] }}
            className="text-xl"
          >
            Category: <span className="font-bold">{meal.strCategory}</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, translateY: '-1rem' }}
            animate={{ opacity: 1, translateY: '0' }}
            transition={{ type: 'tween', duration: 0.5, delay: 0.75, ease: [0.25, 0.25, 0.25, 0.75] }}
            className="text-xl"
          >
            Area: <span className="font-bold">{meal.strArea}</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, translateY: '-1rem' }}
            animate={{ opacity: 1, translateY: '0' }}
            transition={{ type: 'tween', duration: 0.5, delay: 1, ease: [0.25, 0.25, 0.25, 0.75] }}
            className="mt-3 mb-2 font-bold text-xl underline underline-offset-4"
          >
            Instructions
          </motion.p>
          <motion.p
            initial={{ opacity: 0, translateY: '-1rem' }}
            animate={{ opacity: 1, translateY: '0' }}
            transition={{ type: 'tween', duration: 0.5, delay: 1.25, ease: [0.25, 0.25, 0.25, 0.75] }}
            className="mb-5 line-clamp-4 text-lg"
          >
            {meal.strInstructions}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: '0' }}
            animate={{ opacity: 1, scale: '1' }}
            transition={{ type: 'tween', duration: 1.5, delay: 1.5, ease: [0.25, 0.25, 0.25, 0.75] }}
            className="btn btn-primary"
          >
            <Link to={`/meal/${meal.idMeal}`}>View Detail</Link>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewHome;
