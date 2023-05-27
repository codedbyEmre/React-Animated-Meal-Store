import { Routes, Route } from 'react-router-dom';
import ViewHome from '../views/ViewHome';
import MealsByCategory from '../components/MealsByCategory';
import MealDetails from '../components/Meal/MealDetails';
import MealsByIngredient from '../components/MealsByIngredient';
import MealsByArea from '../components/MealsByArea';
import ViewNotFound from '../views/ViewNotFound';

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<ViewHome />} />
      <Route path="/category/:name" element={<MealsByCategory />} />
      <Route path="/meal/:id" element={<MealDetails />} />
      <Route path="/ingredient/:name" element={<MealsByIngredient />} />
      <Route path="/area/:name" element={<MealsByArea />} />
      <Route path="*" element={<ViewNotFound />} />
    </Routes>
  );
};

export default Index;
