// hooks
import { useState, useEffect } from 'react';
// routing
import { Link, NavLink } from 'react-router-dom';
import Index from './routes/Index';
// icons
import { BiCategoryAlt, BiWorld } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
import { themeArrays } from './modules/themeArr';

const { themes } = themeArrays();

const App = () => {
  const [theme, setTheme] = useState('');
  const storedTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'winter';

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const getCategories = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await res.json();
      const sortedCategories = data.categories.sort((a, b) => a.strCategory.localeCompare(b.strCategory));
      setCategories(sortedCategories);
    } catch (err) {}
  };

  const getAreas = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await res.json();
      const sortedAreas = data.meals.sort((a, b) => a.strArea.localeCompare(b.strArea));
      setAreas(sortedAreas);
    } catch (err) {}
  };

  const getIngredients = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await res.json();
      const sortedIngredients = data.meals.sort((a, b) => a.strIngredient.localeCompare(b.strIngredient));
      setIngredients(sortedIngredients);
    } catch (err) {}
  };

  const handleThemeChange = e => {
    const themeValue = e.target.value;
    localStorage.setItem('theme', themeValue);
    setTheme(themeValue);
  };

  useEffect(() => {
    getCategories();
    getAreas();
    getIngredients();
  }, []);

  return (
    <section className="drawer drawer-mobile bg-base-200" data-theme={storedTheme}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-300">
        <nav className="navbar fixed w-[-webkit-fill-available] z-10 bg-base-100 shadow-lg border border-l-2 border-t-0 border-base-300">
          <div className="flex-1 sm:ml-0 -ml-4">
            <Link to="/" className="btn btn-ghost text-base-0 normal-case sm:text-3xl text-2xl ml-2">
              <span className="text-primary">Meal</span>
              Store
            </Link>
          </div>
          {/* Theme selection */}
          <select
            onChange={handleThemeChange}
            value={storedTheme}
            className="select select-bordered w-full sm:max-w-[10rem] max-w-[7rem] capitalize lg:mr-4 mr-0"
          >
            {themes.sort().map((theme, index) => (
              <option key={index}>{theme}</option>
            ))}
          </select>
          <div className="flex-none sm:ml-2 ml-1">
            {/* Hamburger menu */}
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button sm:mr-2 mr-0 cursor-pointer lg:hidden">
              <svg
                xmlns="http:www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
        </nav>
        <main className="max-w-8xl mx-auto sm:p-8 p-4 sm:mt-16 mt-20">
          {/* Routes */}
          <Index />
        </main>
      </div>

      {/* Sidebar */}
      <aside className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 sm:w-80 w-64 bg-base-100 text-base-content">
          {/* Profile section */}
          <section className="flex flex-col items-center pt-2 mb-4">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://avatars.githubusercontent.com/u/67799995?s=400&u=0c3fa793a6479ecc176433d53193b01e6a2f6a58&v=4"
                  alt="Emre Süslü"
                  loading="lazy"
                />
              </div>
            </div>
            <h2 className="mt-3 font-semibold text-xl">Emre Süslü</h2>
            <p className="text-base">Executive Chef</p>
          </section>

          <hr className="mb-2" />

          {/* Category Links */}
          <section tabIndex={0} className="collapse collapse-arrow">
            <input id="checkbox" type="checkbox" name="checkbox" aria-labelledby="categories" />
            <label htmlFor="checkbox"></label>

            <div className="collapse-title sm:text-xl text-lg font-medium flex items-center">
              <BiCategoryAlt className="mr-3" />
              Categories
            </div>
            <ul className="collapse-content">
              {categories.map((category, index) => (
                <li className="my-1" key={index}>
                  <NavLink to={`/category/${category?.strCategory}`} className="py-[10px]">
                    <img
                      className="sm:w-10 sm:h-10 w-8 h-8 rounded-full object-cover"
                      src={category?.strCategoryThumb}
                      alt={category?.strCategory}
                      loading="lazy"
                    />
                    <p className="sm:text-xl text-lg ml-1">{category?.strCategory}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
          {/* Area Link */}
          <section tabIndex={0} className="collapse collapse-arrow">
            <input id="checkbox" type="checkbox" name="checkbox" aria-labelledby="areas" />
            <label htmlFor="checkbox"></label>

            <div className="collapse-title sm:text-xl text-lg  font-medium flex items-center">
              <BiWorld className="mr-3" />
              Areas
            </div>
            <ul className="collapse-content">
              {areas.map((area, index) => (
                <li className="my-1" key={index}>
                  <NavLink to={`/area/${area?.strArea}`} className="py-[10px]">
                    <p className="sm:text-xl text-lg ml-1">{area?.strArea}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
          {/* Ingredient Links */}
          <section tabIndex={0} className="collapse collapse-arrow">
            <input id="checkbox" type="checkbox" name="checkbox" aria-labelledby="ingredients" />
            <label htmlFor="checkbox"></label>

            <div className="collapse-title sm:text-xl text-lg font-medium flex items-center">
              <GiMeal className="mr-3" />
              Ingredients
            </div>
            <ul className="collapse-content">
              {ingredients.map((ingredient, index) => (
                <li className="my-1" key={index}>
                  <NavLink to={`/ingredient/${ingredient?.strIngredient}`} className="py-[10px]">
                    <img
                      className="sm:w-10 sm:h-10 w-8 h-8 rounded-full object-cover"
                      src={`https://www.themealdb.com/images/ingredients/${ingredient?.strIngredient}-Small.png`}
                      alt={ingredient?.strIngredient}
                      loading="lazy"
                    />
                    <p className="sm:text-xl text-lg ml-1">{ingredient?.strIngredient}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </ul>
      </aside>
    </section>
  );
};

export default App;
