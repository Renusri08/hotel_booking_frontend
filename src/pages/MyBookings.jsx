import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import toast from 'react-hot-toast';
import {
  MapPin,
  Calendar,
  Users,
} from "lucide-react";

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

  const handlePayment = async (bookingId) => {
    try {
      const { data } = await axiosInstance.post("/api/bookings/stripe-payment", { bookingId });
      if (data.success) {
        window.location.href = data.url;
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
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Bookings</h1>
          <p className="text-gray-600">
            Here are your hotel bookings. You can view details and manage your reservations.
          </p>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 bg-gray-50 px-10 py-4 border-b border-gray-200 font-semibold text-gray-700 ">
            <div className="col-span-4">Hotel & Room</div>
            <div className="col-span-3">Dates</div>
            <div className="col-span-3">Payment</div>
            <div className="col-span-2">Status</div>
          </div>

          <div className="divide-y divide-gray-100">
            {bookingData.map((booking) => {
              const hotel = booking.hotel; // might be null
              const room = booking.room;   // might be null

              return (
                <div
                  key={booking._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                    {/* Hotel & Room Info */}
                    <div className="col-span-1 md:col-span-4">
                      <div className="flex gap-4 items-center">
                        <img
                          src={
                            room?.images?.[0]
                              ? `https://hotel-booking-backend-drx1.onrender.com/images/${room.images[0]}`
                              : "https://via.placeholder.com/150x100?text=No+Image"
                          }
                          alt={hotel?.hotelName || "Hotel not available"}
                          className="w-32 h-24 md:w-40 md:h-28 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-20">
                          <h3 className="font-semibold text-gray-800 text-lg mb-1">
                            {hotel?.hotelName || "Hotel not available"}
                          </h3>
                          <p className="text-sm text-gray-600 font-medium mb-1">
                            {room?.roomType || "Room type not available"}
                          </p>
                          <div className='flex items-center gap-1 text-gray-500 text-sm mb-1'>
                            <MapPin className='w-4 h-4 text-black' />
                            <span>{hotel?.hotelAddress || "Address not available"}</span>
                          </div>
                          <div className='flex items-center gap-1 text-gray-500 text-sm mb-1'>
                            <Users className="w-3 h-3" />
                            <span>
                              {booking.guests || 1} Guest
                              {booking.guests > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="col-span-1 md:col-span-3">
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <Calendar className='w-4 h-4' />
                          <p className="text-sm text-gray-500">Check-in</p>
                          <p className='font-medium text-gray-800'>
                            {booking.checkIn
                              ? new Date(booking.checkIn).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Calendar className='w-4 h-4' />
                          <p className="text-sm text-gray-500">Check-out</p>
                          <p className='font-medium text-gray-800'>
                            {booking.checkOut
                              ? new Date(booking.checkOut).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="col-span-1 md:col-span-2">
                      <div className='space-y-2'>
                        <p className='font-bold text-lg text-gray-800'>
                          ${booking.totalPrice || 0}
                        </p>
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            booking.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          <button
                            className="cursor-pointer"
                            onClick={() => handlePayment(booking._id)}
                          >
                            {booking.isPaid ? "Paid" : "Pay now"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 md:col-span-2 px-20">
                      <div className='space-y-2'>
                        <div>
                          <div className='flex items-center gap-1'>
                            <div
                              className={`w-3 h-3 rounded-full ${getStatusColor(
                                booking.status
                              )}`}
                            ></div>
                            <span
                              className={`font-medium capitalize ${getStatusTextColor(
                                booking.status
                              )}`}
                            >
                              {booking.status || "Unknown"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
