import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
// icons
import { FaYoutube, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { AiOutlineLink } from 'react-icons/ai';

import Ingredients from './Ingredients';

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [seeMoreOrLess, setSeeMoreOrLess] = useState(true);

  const getMealById = async () => {
    setMeal(null);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setMeal(data.meals[0]);
    } catch (err) {}
  };

  useEffect(() => {
    getMealById();
  }, [id]);

  const handleSeeMoreOrLess = () => {
    setSeeMoreOrLess(!seeMoreOrLess);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: '-1rem' }}
      animate={{ opacity: 1, translateY: '0' }}
      transition={{ type: 'tween', duration: 0.75, delay: 0.25, ease: [0.25, 0.25, 0.25, 0.75] }}
      className="card lg:card-side bg-base-100 shadow-xl"
    >
      {/* Meal Image */}
      <figure className="flex-1">
        <img src={meal?.strMealThumb} alt={meal?.strMeal} className="w-full h-full object-cover" />
      </figure>
      {/* Meal Details */}
      <div className="flex-1 p-8">
        <h2 className="card-title text-4xl">{meal?.strMeal}</h2>
        {/* Links */}
        <p className="flex my-3">
          {meal?.strSource ? (
            <span className="cursor-pointer">
              <a href={meal?.strSource} target="_blank">
                <AiOutlineLink size="24px" />
              </a>
            </span>
          ) : (
            ''
          )}

          {meal?.strYoutube ? (
            <span className="ml-3 cursor-pointer">
              <a href={meal?.strYoutube} target="_blank">
                <FaYoutube color="#FF0000" size="24px" />
              </a>
            </span>
          ) : (
            ''
          )}
        </p>
        {/* Category and Area */}
        <p>
          Category: <span className="font-semibold">{meal?.strCategory}</span>
        </p>
        <p className="mt-1">
          Area: <span className="font-semibold">{meal?.strArea}</span>
        </p>
        {/* Instructions */}
        <h2 className="font-semibold mt-3 mb-1 text-lg">Instructions</h2>
        <p className={`${seeMoreOrLess ? 'line-clamp-3' : ''}`}>{meal?.strInstructions}</p>
        <button onClick={handleSeeMoreOrLess} className="font-medium flex items-center mt-1">
          {seeMoreOrLess ? <FaChevronDown className="mr-1" /> : <FaChevronUp className="mr-1" />}
          {seeMoreOrLess ? 'Read more' : 'Read less'}
        </button>
        {/* Ingredients */}
        <h2 className="font-semibold mt-3 mb-1 text-lg">Ingredients</h2>
        <Ingredients meal={meal} />
      </div>
    </motion.div>
  );
};

export default MealDetails;
