import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CityList from "./components/CityList";
import CityDetails from "./components/CityDetails";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CityList />} />
        <Route path="/city/:cityId" element={<CityDetails />} />
      </Routes>
    </Router>
  );
}
