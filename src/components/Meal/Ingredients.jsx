import { Link } from 'react-router-dom';

const Ingredients = ({ meal }) => {
  const ingredients = [];

  const getImageByIngredient = name => {
    return (
      <img
        className="mb-2 w-16 h-16 object-cover"
        src={`https://www.themealdb.com/images/ingredients/${name}-Small.png`}
        alt={name}
      />
    );
  };

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal ? meal[`strIngredient${i}`] : '';
    const measurement = meal ? meal[`strMeasure${i}`] : '';
    if (ingredient && measurement) {
      ingredients.push(
        <Link to={`/ingredient/${ingredient}`} key={i}>
          <li className="flex flex-col items-center text-center p-3 hover:-translate-y-2 transition-all duration-[250ms]">
            {getImageByIngredient(ingredient)}
            <p className="font-medium">{ingredient}</p>
            <p>{measurement}</p>
          </li>
        </Link>
      );
    }
  }

  return <ul className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2">{ingredients}</ul>;
};

export default Ingredients;
