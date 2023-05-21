import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { BiCategoryAlt, BiWorld } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
import ViewHome from './views/ViewHome';
import MealsByCategory from './components/MealsByCategory';
import { useState, useEffect } from 'react';
import MealDetails from './components/MealDetails';
import MealsByIngredient from './components/MealsByIngredient';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const getCategories = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await res.json();
    setCategories(data.categories);
  };

  const getAreas = async () => {
    const res = await fetch('./src/data/areas.json');
    const data = await res.json();
    setAreas(data.meals);
  };

  const getIngredients = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await res.json();
    setIngredients(data.meals);
  };

  useEffect(() => {
    getCategories();
    getAreas();
    getIngredients();
  }, []);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar bg-base-100 shadow-lg">
            <div className="flex-1">
              <Link to="/" className="btn btn-ghost normal-case text-3xl ml-2">
                <span className="text-primary">Meal</span>
                Store
              </Link>
            </div>
            <div className="flex-none">
              {/* Hamburger menu */}
              <button onClick={handleSidebar} className="btn btn-square btn-ghost mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            </div>
          </nav>
          {/* Rendered routes */}
          <div className="max-w-8xl mx-auto p-8">
            <Routes>
              <Route path="/" element={<ViewHome />} />
              <Route path="/category/:name" element={<MealsByCategory />} />
              <Route path="/meal/:id" element={<MealDetails />} />
              <Route path="/ingredient/:name" element={<MealsByIngredient />} />
            </Routes>
          </div>
        </div>
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        {/* Drawer */}
        <div className={`drawer-side bg-white ${showSidebar ? 'border border-r-gray-300 border-t-0' : ''} `}>
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className={showSidebar ? 'menu w-72 p-2' : 'menu w-0 p-0'}>
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
                <BiCategoryAlt className="mr-2" />
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
                <BiWorld className="mr-2" />
                Areas
              </div>
              <div className="collapse-content">
                {areas.map((area, index) => (
                  <li className="my-1" key={index}>
                    <Link className="py-[10px]">
                      <img className="w-10 rounded-full h-10 object-cover" src={area?.flag} alt={area?.strArea} />
                      <p className="text-xl ml-1">{area?.strArea}</p>
                    </Link>
                  </li>
                ))}
              </div>
            </div>
            <hr />
            {/* Ingredients */}
            <div tabIndex={0} className="collapse collapse-arrow">
              <input type="checkbox" />

              <div className="collapse-title text-xl font-medium flex items-center">
                <GiMeal className="mr-2" />
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
    </div>
  );
};

export default App;
