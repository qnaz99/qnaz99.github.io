// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import HostFleet from "./pages/HostFleet.tsx";
import FAQ from "./pages/FAQ.tsx";
import Support from "./pages/Support.tsx";
import RentalAgreement from "./pages/RentalAgreement.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import RentScooter from "./pages/RentScooter.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/ukrooze/" element={<Home />} />
      <Route path="/ukrooze/host-fleet" element={<HostFleet />} />
      <Route path="/ukrooze/faq" element={<FAQ />} />
      <Route path="/ukrooze/support" element={<Support />} />
      <Route path="/ukrooze/rental-agreement" element={<RentalAgreement />} />
      <Route path="/ukrooze/about-us" element={<AboutUs />} />
      <Route path="/ukrooze/rent-scooter" element={<RentScooter />} />

      {/* <Route path="/ukrooze/contact" element={<Contact />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;
