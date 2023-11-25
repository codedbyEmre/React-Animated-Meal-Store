import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Meal = ({ meal, index }) => {
  const { idMeal, strMealThumb, strMeal } = meal;

  return (
    <Link to={`/meal/${idMeal}`} className="hover:scale-105 transition-all duration-[250ms]">
      <motion.article
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'tween', duration: 0.75, delay: 0.1 * index, ease: [0.25, 0.25, 0.25, 0.75] }}
        className="rounded-lg overflow-hidden shadow-lg bg-base-100"
      >
        <img className="w-full max-h-60 object-cover" src={strMealThumb} alt={strMeal} loading="lazy" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-base-content line-clamp-1">{strMeal}</div>
        </div>
      </motion.article>
    </Link>
  );
};

export default Meal;
