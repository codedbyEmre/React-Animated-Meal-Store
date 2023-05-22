import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Meal = ({ meal, index }) => {
  return (
    <Link to={`/meal/${meal.idMeal}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'tween', duration: 0.75, delay: 0.1 * index, ease: [0.25, 0.25, 0.25, 0.75] }}
        className="rounded-lg overflow-hidden shadow-lg bg-base-100"
      >
        <img className="w-full max-h-60 object-cover" src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-base-content line-clamp-1">{meal.strMeal}</div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Meal;
