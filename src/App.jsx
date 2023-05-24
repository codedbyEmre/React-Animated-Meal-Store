// hooks
import { useState, useEffect } from 'react';
// routing
import { Link, NavLink } from 'react-router-dom';
import Index from './routes/Index';
// icons
import { BiCategoryAlt, BiWorld } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';

const App = () => {
  const themes = [
    'winter',
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee'
  ];
  const [theme, setTheme] = useState('');
  const storedTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'winter';

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const getCategories = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await res.json();
      setCategories(data.categories);
    } catch (err) {}
  };

  const getAreas = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await res.json();
      setAreas(data.meals);
    } catch (err) {}
  };

  const getIngredients = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await res.json();
      setIngredients(data.meals);
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
        <nav className="navbar bg-base-100 shadow-lg border border-l-2 border-t-0 border-base-300">
          <div className="flex-1 sm:ml-0 -ml-4">
            <Link to="/" className="btn btn-ghost text-base-0 normal-case sm:text-3xl text-2xl ml-2">
              <span className="text-primary">Meal</span>
              Store
            </Link>
          </div>
          {/* Select theme */}
          <select
            onChange={handleThemeChange}
            value={localStorage.getItem('theme')}
            selected
            className="select select-bordered w-full sm:max-w-[10rem] max-w-[7rem] capitalize lg:mr-4 mr-0"
          >
            {themes.map((theme, index) => (
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
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          </div>
        </nav>
        <main className="max-w-8xl mx-auto sm:p-8 p-4">
          {/* Routes */}
          <Index />
        </main>
      </div>
      <aside className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <div className="flex flex-col items-center pt-2 mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://avatars.githubusercontent.com/u/67799995?s=400&u=0c3fa793a6479ecc176433d53193b01e6a2f6a58&v=4" />
              </div>
            </div>
            <h2 className="mt-3 font-semibold text-xl">Emre Süslü</h2>
            <p className="text-base">Executive Chef</p>
          </div>

          {/* Categories */}
          <section tabIndex={0} className="collapse collapse-arrow">
            <input type="checkbox" />

            <div className="collapse-title text-xl font-medium flex items-center">
              <BiCategoryAlt className="mr-3" />
              Categories
            </div>
            <div className="collapse-content">
              {categories.map((category, index) => (
                <li className="my-1" key={index}>
                  <NavLink to={`/category/${category?.strCategory}`} className="py-[10px]">
                    <img
                      className="w-10 rounded-full h-10 object-cover"
                      src={category?.strCategoryThumb}
                      alt={category?.strCategory}
                    />
                    <p className="text-xl ml-1">{category?.strCategory}</p>
                  </NavLink>
                </li>
              ))}
            </div>
          </section>
          {/* Areas */}
          <section tabIndex={0} className="collapse collapse-arrow">
            <input type="checkbox" />

            <div className="collapse-title text-xl font-medium flex items-center">
              <BiWorld className="mr-3" />
              Areas
            </div>
            <div className="collapse-content">
              {areas.map((area, index) => (
                <li className="my-1" key={index}>
                  <NavLink to={`/area/${area?.strArea}`} className="py-[10px]">
                    <p className="text-xl ml-1">{area?.strArea}</p>
                  </NavLink>
                </li>
              ))}
            </div>
          </section>
          {/* Ingredients */}
          <section tabIndex={0} className="collapse collapse-arrow">
            <input type="checkbox" />

            <div className="collapse-title text-xl font-medium flex items-center">
              <GiMeal className="mr-3" />
              Ingredients
            </div>
            <div className="collapse-content">
              {ingredients.map((ingredient, index) => (
                <li className="my-1" key={index}>
                  <NavLink to={`/ingredient/${ingredient?.strIngredient}`} className="py-[10px]">
                    <img
                      className="w-10 rounded-full h-10 object-cover"
                      src={`https://www.themealdb.com/images/ingredients/${ingredient?.strIngredient}-Small.png`}
                      alt={ingredient?.strIngredient}
                    />
                    <p className="text-xl ml-1">{ingredient?.strIngredient}</p>
                  </NavLink>
                </li>
              ))}
            </div>
          </section>
        </ul>
      </aside>
    </section>
  );
};

export default App;
