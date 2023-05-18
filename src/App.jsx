import { Route, Routes } from 'react-router-dom';
import ViewHome from './views/ViewHome';
import MealsByCategory from './components/MealsByCategory';

const App = () => {
  return (
    <div className="bg-slate-200 min-h-screen">
      <div className="max-w-6xl mx-auto p-6 py-8">
        <Routes>
          <Route path="/" element={<ViewHome />} />
          <Route path="/category/:name" element={<MealsByCategory />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
