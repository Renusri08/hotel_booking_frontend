import React, { useEffect } from 'react'
import {AppContext} from "../../context/AppContext";
import {motion} from "motion/react";
import { useContext,useState } from 'react';
import { MapIcon ,Phone,Star} from 'lucide-react';
import toast from 'react-hot-toast';


const AllHotels = () => {
  const {navigate,axiosInstance,refreshAllData}=useContext(AppContext);

  const [hotelData,setHotelData]=useState([]);
  const fetchOwnerHotels=async()=>{
    try{
      const {data}=await axiosInstance.get("/api/hotel/get-all");
      if(data.success){
        setHotelData(data.hotels);
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
      toast.error(error.message);
    }
  };
useEffect(()=>{
  fetchOwnerHotels();
})

const deleteHotel=async(id)=>{
  try{
    const {data}=await axiosInstance.delete(`/api/hotel/delete/${id}`);
    if(data.success){
      console.log("toast1")
      refreshAllData();
      navigate("/owner")
      toast.success(data.message);
    
    }
    else{
      console.log("toast2")
      toast.error(data.message);
    }
  }
  catch(error){
    console.log("toast3")
    console.log(error);
    toast.error(error.message);
  }
}

  return (
   <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/*  Header*/}
        <div className='mb-8 flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl shadow-xl p-6'>
          <div>
            <h1 className='text-4xl font-bold text-gray-800 mb-2'>
              {" "}Premium Hotels Collections</h1>
            <p className="text-gray-600">
              Discover exceptional stays around the world
            </p>
          </div>

          <motion.button  className="bg-primary text-white px-6 py-1 rounded-md cursor-pointer"
          onClick={()=>navigate("/owner/register-hotel")}
          whileHover={{scale:1.05}}
          transition={{ease:"easeInOut",duration:0.3}}>
            Register Hotel
          </motion.button>
        </div>

        {/* Hotels Table*/}
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <div className='overflow-x-auto'>{/* Without overflow-x-auto, the table would break the layout 
          // or be cut off.With overflow-x-auto, the user can scroll horizontally to see all table columns without breaking the design.*/}
            <table className='w-full'>
              <thead className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                    Hotel
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                    Location
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                    Hotel owner
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                    Contact number
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                    Rating
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                    Price/Night
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                    Amenities
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {hotelData.map((hotel,index)=>(
                  <tr key={hotel._id}
                  className={`hover:bg-blue-50 transition-all duration-200 ${
                    index %2===0? "bg-white":"bg-gray-100"
                  }`}>
                    <td className="px-6 py-6">
                      <div className="  space-x-4">
                        <div className="relative">
                          <img src={`https://hotel-booking-backend-drx1.onrender.com/images/${hotel.image}`} alt={hotel.name} className="w-full h-15 rounded-xl object-cover shadow-md"/>
                         </div>
                          <div className='text-lg  text-justify font-semibold text-gray-800 hover:text-blue-600 transition-colors'>
                            {hotel.hotelName}
                          </div>
                      </div>
                    </td>

                    <td className='px-6 py-6'>
                      <div>
                        <MapIcon className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0"></MapIcon>
                        <span className='text-gray-600 text-sm leading-relaxed'>{hotel.hotelAddress}</span>
                      </div>
                    </td>

                    <td className='px-6 py-6'>
                      <div>
                        <span className='text-gray-600 text-sm leading-relaxed'>{hotel.owner.name}</span>
                      </div>
                    </td>

                    <td className='px-6 py-6'>
                      <div  className="flex items-center space-x-4">
                        <Phone className="w-4 h-4 text-green-400 mt-1 flex-shrink-0"></Phone>
                        <span className='text-gray-600 text-sm leading-relaxed'>+919398939088</span>
                      </div>
                    </td>
                  

                    <td className='px-6 py-6'>
                      <div   className="flex items-center space-x-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-current"></Star>
                        <span className='text-gray-600 text-sm leading-relaxed'>{hotel.rating}</span>
                      </div>
                    </td>

                    <td className='px-6 py-6'>
                      <span className='text-2xl font-bold text-green-600'>
                        ${hotel.price}
                      </span>
                    </td>

                    <td className='px-6 py-6'>
                      <div className='flex flex-wrap gap-1'>
                        {
                          hotel.amenities.split(",").map((amenity,index)=>(
                            <span key={index} className='px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full'>{amenity}</span>
                          ))
                        }
                      </div>
                    </td>

                    <td>
                      <button className='bg-red-500 text-white py-1 px-4 rounded-full cursor-pointer' onClick={()=>deleteHotel(hotel._id)}>delete</button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
   
  )
}

export default AllHotels;
