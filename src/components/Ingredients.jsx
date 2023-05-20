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
        <li className="flex flex-col items-center text-center p-3" key={i}>
          {getImageByIngredient(ingredient)}
          <p className="font-medium">{ingredient}</p>
          <p>{measurement}</p>
        </li>
      );
    }
  }

  return <ul className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2">{ingredients}</ul>;
};

export default Ingredients;
