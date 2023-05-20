import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ViewHome = () => {
  const [meal, setMeal] = useState([]);

  const getMeal = async () => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await res.json();
    setMeal(data.meals[0]);
  };

  useEffect(() => {
    getMeal();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: '-1rem' }}
        animate={{ opacity: 1, translateY: '0' }}
        transition={{ type: 'tween', duration: 0.5, delay: 0.2, ease: [0.25, 0.25, 0.25, 0.75] }}
        className="text-4xl font-medium mt-6"
      >
        <i className="text-primary text-6xl mb-2">Nourish Your Palate</i>
        <p className="mt-2">Discover the Perfect Blend of Flavor and Efficiency</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: '0' }}
        animate={{ opacity: 1, scale: '1' }}
        transition={{ type: 'tween', duration: 0.5, delay: 0.3, ease: [0.25, 0.25, 0.25, 0.75] }}
        className="hero min-h-[60vh] rounded-lg overflow-hidden mt-8"
        style={{ backgroundImage: `url("${meal.strMealThumb}")` }}
      >
        <div className="hero-overlay bg-[#111] bg-opacity-70"></div>
        <div className="hero-content text-neutral-content">
          <div className="px-4">
            <motion.h1
              initial={{ opacity: 0, translateY: '-1rem' }}
              animate={{ opacity: 1, translateY: '0' }}
              transition={{ type: 'tween', duration: 0.5, delay: 0.4, ease: [0.25, 0.25, 0.25, 0.75] }}
              className="mb-5 text-5xl font-bold"
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
              transition={{ type: 'tween', duration: 0.5, delay: 0.6, ease: [0.25, 0.25, 0.25, 0.75] }}
              className="text-xl mt-2"
            >
              Area: <span className="font-bold">{meal.strArea}</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, translateY: '-1rem' }}
              animate={{ opacity: 1, translateY: '0' }}
              transition={{ type: 'tween', duration: 0.5, delay: 0.7, ease: [0.25, 0.25, 0.25, 0.75] }}
              className="mt-5 mb-1 font-bold text-xl"
            >
              Instructions
            </motion.p>
            <motion.p
              initial={{ opacity: 0, translateY: '-1rem' }}
              animate={{ opacity: 1, translateY: '0' }}
              transition={{ type: 'tween', duration: 0.5, delay: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
              className="mb-5 line-clamp-4 text-lg"
            >
              {meal.strInstructions}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: '0' }}
              animate={{ opacity: 1, scale: '1' }}
              transition={{ type: 'tween', duration: 0.5, delay: 0.9, ease: [0.25, 0.25, 0.25, 0.75] }}
              className="btn btn-primary"
            >
              <Link to={`/meal/${meal.idMeal}`}>View Detail</Link>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ViewHome;
