import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { BiCategoryAlt, BiWorld } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
import ViewHome from './views/ViewHome';
import MealsByCategory from './components/MealsByCategory';
import { useState, useEffect } from 'react';
import MealDetails from './components/MealDetails';
import MealsByIngredient from './components/MealsByIngredient';
import MealsByArea from './components/MealsByArea';

const App = () => {
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

  useEffect(() => {
    getCategories();
    getAreas();
    getIngredients();
  }, []);

  return (
    <div className="drawer drawer-mobile bg-base-200">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-slate-200">
        <nav className="navbar bg-base-100 shadow-lg">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-3xl ml-2">
              <span className="text-primary">Meal</span>
              Store
            </Link>
          </div>
          <div className="flex-none">
            {/* Hamburger menu */}
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button mr-2 cursor-pointer lg:hidden">
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
        <div className="max-w-8xl mx-auto p-8">
          <Routes>
            <Route path="/" element={<ViewHome />} />
            <Route path="/category/:name" element={<MealsByCategory />} />
            <Route path="/meal/:id" element={<MealDetails />} />
            <Route path="/ingredient/:name" element={<MealsByIngredient />} />
            <Route path="/area/:name" element={<MealsByArea />} />
          </Routes>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <div className="flex flex-col items-center">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://avatars.githubusercontent.com/u/67799995?s=400&u=0c3fa793a6479ecc176433d53193b01e6a2f6a58&v=4" />
              </div>
            </div>
            <h2 className="mt-2 font-semibold text-xl text-gray-700">Emre Süslü</h2>
            <p className="text-gray-600 text-base">Gourmet</p>
          </div>
          <div className="divider mb-0 mt-2"></div>
          {/* Categories */}
          <div tabIndex={0} className="collapse collapse-arrow">
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
          </div>
          <hr />
          {/* Areas */}
          <div tabIndex={0} className="collapse collapse-arrow">
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
          </div>
          <hr />
          {/* Ingredients */}
          <div tabIndex={0} className="collapse collapse-arrow">
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
          </div>
        </ul>
      </div>
    </div>
  );
};

export default App;
