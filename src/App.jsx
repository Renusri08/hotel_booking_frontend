import React, { useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "../src/pages/Home";
import Hotels from "../src/pages/Hotels";
import Rooms from "../src/pages/Rooms";
import SingleRoom from "../src/pages/SingleRoom";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import About from "../src/pages/About";
import MyBookings from "../src/pages/MyBookings";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AppContext } from './context/AppContext';
import OwnerLayout from './pages/owner/OwnerLayout';
import AllHotels from './pages/owner/AllHotels';
import AllRooms from './pages/owner/AllRooms';
import Bookings from './pages/owner/Bookings';
import RegisterHotel from './pages/owner/RegisterHotel';
import AddRoom from './pages/owner/AddRoom';
import Loader from './components/Loader';

const App = () => {
  const { owner } = useContext(AppContext);
  const location = useLocation();
  const ownerPath = location.pathname.includes("owner");

  return (
    <div className="w-full mx-auto">
      <Toaster />
      {!ownerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<SingleRoom />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loader/:nextUrl" element={<loader/>}/>

        <Route path="/owner" element={owner ? <OwnerLayout /> : <Navigate to="/login" />}>
          <Route index element={<AllHotels />} />
          <Route path="register-hotel" element={<RegisterHotel />} />
          <Route path="rooms" element={<AllRooms />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>

      {!ownerPath && <Footer />}
    </div>
  );
}

export default App;
