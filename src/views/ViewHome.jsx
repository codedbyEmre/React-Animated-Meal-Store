import { useEffect, useState } from 'react';
import Category from './../components/Category';

const ViewHome = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await res.json();
    setCategories(data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
      {categories.map((category, index) => (
        <Category category={category} index={index} key={category.idCategory} />
      ))}
    </div>
  );
};

export default ViewHome;
