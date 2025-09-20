import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { MapPin, Calendar, Users, DollarSign, CreditCard } from "lucide-react";

const MyBookings = () => {
  const { axiosInstance } = useContext(AppContext);
  const [bookingData, setBookingData] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axiosInstance.get("/api/bookings/user");
      if (data.success) {
        setBookingData(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {bookingData.length === 0 ? (
          <p className="text-gray-600">No bookings found.</p>
        ) : (
          <div className="space-y-6">
            {bookingData.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-xl p-6 space-y-4"
              >
                {/* Hotel Info */}
                <div className="flex gap-4">
                  <img
                    src={
                      booking.hotel?.image
                        ? `https://hotel-booking-backend-drx1.onrender.com/images/${booking.hotel.image}`
                        : "https://via.placeholder.com/150x100?text=No+Image"
                    }
                    alt={booking.hotel?.hotelName || "Hotel"}
                    className="w-32 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {booking.hotel?.hotelName || "Hotel not available"}
                    </h2>
                    <p className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {booking.hotel?.hotelAddress || "No address"}
                    </p>
                    <p className="text-gray-500">
                      Amenities: {booking.hotel?.amenities || "N/A"}
                    </p>
                    <p className="text-gray-500">Rating: {booking.hotel?.rating || "N/A"}</p>
                  </div>
                </div>

                {/* Room Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Room</h3>
                  <p>Type: {booking.room?.roomType || "N/A"}</p>
                  <p>Price/Night: ${booking.room?.pricePerNight || "N/A"}</p>
                  <p>Description: {booking.room?.description || "N/A"}</p>
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Check-in:{" "}
                      {booking.checkIn
                        ? new Date(booking.checkIn).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Check-out:{" "}
                      {booking.checkOut
                        ? new Date(booking.checkOut).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Guests: {booking.persons || booking.guests || 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Total: ${booking.totalPrice}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Payment: {booking.paymentMethod || "N/A"}</span>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Meta info */}
                <div className="text-xs text-gray-400 mt-2">
                  <p>Created: {new Date(booking.createdAt).toLocaleString()}</p>
                  <p>Updated: {new Date(booking.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
