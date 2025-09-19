import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import {AppContext} from "../../context/AppContext";
import {motion }from "motion/react";
import toast from 'react-hot-toast';

const AddRoom = () => {
  const {hotelData,axiosInstance,navigate,refreshAllData}=useContext(AppContext);

  const[roomData,setRoomData]=useState({
    hotel:"",
    roomType:"",
    pricePerNight:"",
    description:"",
    images:[],
    amenities:[],
    isAvailable:true
  })
  
 
  
  
  const handleChange = (e) => {
    const { name, value } = e.target; // name will be "hotel", value will be item._id
    setRoomData(prev => ({ ...prev, [name]: value }));
};

  const handleImageChange=(e,index)=>{
    const file=e.target.files[0];
    if(file){
      const updatedImages=[...roomData.images];
      updatedImages[index]=file;
      setRoomData({...roomData,images:updatedImages})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData=new FormData();

    formData.append("hotel",roomData.hotel);
    formData.append("roomType",roomData.roomType);
    formData.append("pricePerNight",roomData.pricePerNight);
    formData.append("description",roomData.description);
    formData.append("amenities",roomData.amenities);

    for(let i=0;i<roomData.images.length;i++){
      formData.append("images",roomData.images[i]);
    }

    try{
      const {data}=await axiosInstance.post("/api/room/add",formData,{
        headers:{"Content-Type":"multipart/form-data",}
      });
      if(data.success){
        toast.success(data.message);
        refreshAllData();
        navigate("/owner/rooms");
      }
    }
    catch(error){
      toast.error(error.message);
    }
  };


  return (
    <div className="py-10 flex flex-col justify-between bg-white">
    <form className="md:p-10 p-4 space-y-5 max-w-lg" onSubmit={handleSubmit}>
        <div>
            <p className="text-base font-medium">Room Images</p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {Array(4).fill("").map((_,index)=>(
                <label key={index} htmlFor={`image${index}`}>
                  <input type="file" accept="image/*" id={`image${index}`} onChange={(e)=>handleImageChange(e,index)} hidden/>
                  <img className="max-w-24 rounded-md cursor-pointer" src={roomData.images[index]?URL.createObjectURL(roomData.images[index]):"https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"}
                  alt="upload" width={100} height={100}/>
                </label>

              ))}
            </div>
        </div>
    
        <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="rating">Room Type</label>
            <input name="roomType" type="text" placeholder="Type here" value={roomData.roomType} onChange={handleChange} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
        </div> 
        <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="hotel-address">Room Description</label>
            <textarea name="description" value={roomData.description} onChange={handleChange} rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
        </div>
        
        <div className="flex flex-col gap-1 w-32">
                <label className="text-base font-medium" htmlFor="price">Price</label>
                <input name="pricePerNight" type="number" placeholder="0" value={roomData.pricePerNight} onChange={handleChange} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="amenities">Amenities</label>
            <textarea name="amenities" value={roomData.amenities} onChange={handleChange} rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" ></textarea>
        </div>

        <div className="w-full flex flex-col gap-1">
                <label htmlFor="">Select Hotel</label>
                {console.log(hotelData)}
                <select name="hotel"  value={roomData.hotel} onChange={handleChange} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" >
                  <option value="">Select Hotel</option>
                  {hotelData.map((item)=>(
                    <option key={item._id} value={item._id}>{item.hotelName}</option>
                  ))}
                </select>
        </div>
        
        
        <div className='flex items-center flex-wrap'>
        <div className="flex-1 flex flex-row gap-3 w-10">
                <input name="isAvailable" type="checkbox" placeholder="0" value={roomData.isAvailable} onChange={handleChange} className=" items-center rounded border border-gray-500/40 " required />
                <label className="font-medium items-center" htmlFor="">isAvailable</label>
        </div>
        </div>

        <button className="px-8 py-2.5 bg-primary text-white font-medium rounded">ADD ROOM</button>
    </form>
</div>
  )
}

export default AddRoom;
