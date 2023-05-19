import { motion } from 'framer-motion';

const Meal = ({ meal, index }) => {
  return (
    <motion.div
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
  );
};

export default Meal;
