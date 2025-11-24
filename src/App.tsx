// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import HostFleet from "./pages/HostFleet.tsx";
import FAQ from "./pages/FAQ.tsx";
import Support from "./pages/Support.tsx";
import RentalAgreement from "./pages/RentalAgreement.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import RentScooter from "./pages/RentScooter.tsx";
import Locations from "./pages/Locations.tsx";
import GovernmentContracting from "./pages/GovernmentContracting.tsx";
import BuyScooter from "./pages/BuyScooter.tsx";
import ScooterDetail from "./pages/ScooterDetail.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/host-fleet" element={<HostFleet />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/support" element={<Support />} />
      <Route path="/rental-agreement" element={<RentalAgreement />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/rent-scooter" element={<RentScooter />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/government" element={<GovernmentContracting />} />
      <Route path="/buy-scooter" element={<BuyScooter />} />
      <Route path="/scooters/:slug" element={<ScooterDetail />} />
    </Routes>
  );
};

export default App;
