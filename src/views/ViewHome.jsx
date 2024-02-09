import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useFetchMeals from '../hooks/useFetchMeals';

const ViewHome = () => {
  const {
    data: meal,
    loading,
    error
  } = useFetchMeals(
    'https://www.themealdb.com/api/json/v1/1/random.php',
    'Sorry, could not get meal informations from the source'
  );

  const headlines = [
    'Nourish Your Palate',
    'Ignite Culinary Delight',
    'Stimulate Your Taste Buds',
    'Revel in Gourmet Delights'
  ];

  const getRandomHeadline = headlines[Math.floor(Math.random() * headlines.length)];

  const subtitles = [
    'Discover the Perfect Blend of Flavor and Efficiency',
    'Uncover Flavorful Efficiency in Every Blend',
    'Embrace the Perfect Balance of Flavor and Efficiency',
    'Encounter the Harmony of Flavor and Operational Excellence',
    'Find the Ideal Fusion of Taste and Productivity'
  ];

  const getRandomSubtitle = subtitles[Math.floor(Math.random() * subtitles.length)];

  return (
    <>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      {meal && (
        <>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'tween', duration: 1, delay: 0.35, ease: [0.25, 0.25, 0.25, 0.75] }}
            className="font-medium"
          >
            <i className="text-primary md:text-6xl sm:text-5xl text-4xl mb-2">{getRandomHeadline}</i>
            <p className="mt-2 md:text-4xl sm:text-3xl text-2xl">{getRandomSubtitle}</p>
          </motion.section>
          <motion.section
            initial={{ opacity: 0, translateY: '-1rem' }}
            animate={{ opacity: 1, translateY: '0' }}
            transition={{ type: 'tween', duration: 1, delay: 0.75, ease: [0.25, 0.25, 0.25, 0.75] }}
            className="card lg:card-side bg-base-100 shadow-xl lg:h-[25rem] lg:mt-16 mt-10"
          >
            {/* Meal Image */}
            <figure className="flex-1">
              <img src={meal?.strMealThumb} alt={meal?.strMeal} className="w-full h-full object-cover" loading="lazy" />
            </figure>
            {/* Meal Details */}
            <div className="flex-1 p-8">
              <h2 className="card-title text-4xl line-clamp-1 mb-6">{meal?.strMeal}</h2>
              {/* Category and Area */}
              <p>
                Category:
                <Link to={`/category/${meal?.strCategory}`} className="ml-1 font-semibold">
                  {meal?.strCategory}
                </Link>
              </p>
              <p className="mt-1">
                Area:
                <Link to={`/area/${meal?.strArea}`} className="ml-1 font-semibold">
                  {meal?.strArea}
                </Link>
              </p>
              {/* Instructions */}
              <h2 className="font-semibold mt-4 mb-1 text-lg">Instructions</h2>
              <p className="line-clamp-4">{meal?.strInstructions}</p>
              {/* View More Btn */}
              <Link to={`/meal/${meal.idMeal}`}>
                <button className="btn btn-primary mt-6">View Detail</button>
              </Link>
            </div>
          </motion.section>
        </>
      )}
    </>
  );
};

export default ViewHome;
