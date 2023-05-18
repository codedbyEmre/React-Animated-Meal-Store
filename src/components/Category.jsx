import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Category = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'tween', duration: 0.75, delay: 0.1 * index, ease: [0.25, 0.25, 0.25, 0.75] }}
      className="rounded-lg overflow-hidden shadow-lg bg-white"
    >
      <Link to={`/category/${category.strCategory}`}>
        <img className="w-full" src={category.strCategoryThumb} alt={category.strCategory} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{category.strCategory}</div>
          <p className="text-gray-700 text-base line-clamp-4">{category.strCategoryDescription}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default Category;
