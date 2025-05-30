import './App.css'
import FoodDeliveryHome from './components/homepage'
import OrderPage from './components/OrderPage'

// ✅ Import BrowserRouter, Routes, and Route
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodDeliveryHome />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
