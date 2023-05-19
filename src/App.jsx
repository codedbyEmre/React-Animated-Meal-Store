import { NavLink, Route, Routes } from 'react-router-dom';
import ViewHome from './views/ViewHome';
import MealsByCategory from './components/MealsByCategory';
import { useState, useEffect } from 'react';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const getCategories = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await res.json();
    setCategories(data.categories);
  };

  useEffect(() => {
    getCategories();
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
          <div className="navbar bg-base-100 shadow-lg">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-2xl ml-2">Meal Store</a>
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
          </div>
          {/* Rendered routes */}
          <div className="max-w-8xl mx-auto p-8">
            <Routes>
              <Route path="/" element={<ViewHome />} />
              <Route path="/category/:name" element={<MealsByCategory />} />
            </Routes>
          </div>
        </div>
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        {/* Drawer */}
        <div className={`drawer-side ${showSidebar ? 'border border-r-gray-300 border-t-0' : ''} `}>
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className={showSidebar ? 'menu bg-base-100 w-64 p-2' : 'menu bg-base-100 w-0 p-0'}>
            {categories.map((category, index) => (
              <li className="my-1" key={index}>
                <NavLink to={`/category/${category.strCategory}`} className="py-[10px]">
                  <img
                    className="w-10 rounded-full h-10 object-cover"
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                  />
                  <p className="text-xl ml-1">{category.strCategory}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
