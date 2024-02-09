import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
// icons
import { FaYoutube, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { AiOutlineLink } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import Ingredients from './Ingredients';
import useFetchMeals from '../../hooks/useFetchMeals';

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seeMoreOrLess, setSeeMoreOrLess] = useState(true);

  const {
    data: meal,
    loading,
    error
  } = useFetchMeals(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    'Sorry, could not get meal details from the source'
  );

  const handleSeeMoreOrLess = () => {
    setSeeMoreOrLess(!seeMoreOrLess);
  };

  const formatTags = tags => {
    return tags.split(',').join(', ');
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}
      {meal && (
        <motion.div
          initial={{ opacity: 0, translateY: '-1rem' }}
          animate={{ opacity: 1, translateY: '0' }}
          transition={{ type: 'tween', duration: 0.75, delay: 0.25, ease: [0.25, 0.25, 0.25, 0.75] }}
        >
          <button onClick={() => navigate(-1)} className="btn btn-primary mb-6 capitalize tracking-wide btn-sm h-10">
            <BiArrowBack size="18px" className="mr-1" />
            Back
          </button>

          <div className="card lg:card-side bg-base-100 shadow-xl">
            {/* Meal Image */}
            {meal.strMealThumb && (
              <figure className="flex-1">
                <img
                  src={meal.strMealThumb}
                  alt={meal?.strMeal}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>
            )}
            {/* Meal Details */}
            <div className="flex-1 p-8">
              {meal.strMeal && <h2 className="card-title text-4xl">{meal.strMeal}</h2>}

              {/* Source and Youtube */}
              <p className="flex gap-4 my-3">
                {meal.strSource && (
                  <span className="cursor-pointer">
                    <a href={meal.strSource} target="_blank">
                      <AiOutlineLink size="24px" />
                    </a>
                  </span>
                )}

                {meal.strYoutube && (
                  <span className="cursor-pointer">
                    <a href={meal.strYoutube} target="_blank">
                      <FaYoutube color="#FF0000" size="24px" />
                    </a>
                  </span>
                )}
              </p>
              {/* Category, Area, Tags */}
              {meal.strCategory && (
                <p>
                  Category:
                  <Link to={`/category/${meal.strCategory}`} className="ml-1 font-semibold">
                    {meal?.strCategory}
                  </Link>
                </p>
              )}
              {meal.strArea && (
                <p className="mt-1">
                  Area:
                  <Link to={`/area/${meal.strArea}`} className="ml-1 font-semibold">
                    {meal?.strArea}
                  </Link>
                </p>
              )}
              {meal.strTags && (
                <p className="mt-1">
                  Tags:
                  <span className="ml-1 font-semibold break-words">{formatTags(meal.strTags)}</span>
                </p>
              )}
              {/* Instructions */}
              {meal.strInstructions && (
                <>
                  <h2 className="font-semibold mt-3 mb-1 text-lg">Instructions</h2>
                  <p className={`${seeMoreOrLess ? 'line-clamp-3' : ''}`}>{meal.strInstructions}</p>
                  <button onClick={handleSeeMoreOrLess} className="font-medium flex items-center mt-1">
                    {seeMoreOrLess ? <FaChevronDown className="mr-1" /> : <FaChevronUp className="mr-1" />}
                    {seeMoreOrLess ? 'See more' : 'See less'}
                  </button>
                </>
              )}
              {/* Ingredients */}
              <h2 className="font-semibold mt-3 mb-1 text-lg">Ingredients</h2>
              <Ingredients meal={meal} />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default MealDetails;
