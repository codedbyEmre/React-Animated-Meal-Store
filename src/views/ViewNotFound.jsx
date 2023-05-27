import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ViewNotFound = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'tween', duration: 0.75, delay: 0.25, ease: [0.25, 0.25, 0.25, 0.75] }}
      className="text-center"
    >
      <h1 className="sm:text-[8rem] text-[6rem] font-semibold">404</h1>
      <h3 className="uppercase sm:text-[3.75rem] text-[2.5rem] sm:-mt-8 -mt-6">Opps! Page not found</h3>
      <p className="sm:text-[1.75rem] text-[1.35rem] sm:-mt-2">Sorry, the page you're looking for doesn't exist.</p>
      <Link to={'/'}>
        <button className="btn btn-primary sm:mt-10 mt-6">Return Home</button>
      </Link>
    </motion.section>
  );
};

export default ViewNotFound;
