import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const RegisterHotel = () => {

  const {axiosInstance,navigate,refreshAllData}=useContext(AppContext);
  const[data,setData]=useState({
    hotelName:"",
    hotelAddress:"",
    rating:"",
    price:"",
    amenities:"",
    image:"null"
  })
  
  const [file,setFile]=useState(null);
  const [preview,setPreview] =useState(null);
  
  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const handleImageChange=(e)=>{
    const selectedFile=e.target.files[0];
    setFile(selectedFile);
    setData({...data,image:selectedFile});
    if(selectedFile){
      const imageUrl=URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
    }
  }

  const handleSubmit =async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("hotelName",data.hotelName);
    formData.append("hotelAddress",data.hotelAddress);
    formData.append("rating",data.rating);
    formData.append("price",data.price);
    formData.append("amenities",data.amenities);
    formData.append("image",file);
    try{
      const {data}=await axiosInstance.post("/api/hotel/register",formData);
      if(data.success){
        toast.success(data.message);
        refreshAllData();
        navigate("/owner");
      }
      else{
        toast.error(data.message);
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
            <p className="text-base font-medium">Hotel Image</p>
            <div className="w-full my-4">
               {/* hotel image review*/}
               {
                preview && (
                  <div className='mb-3 flex justify-center'>
                    <img src={preview} alt="" className='w-25 h-24 object-cover rounded shadow'/>
                    </div>
                )
               }
               <input type="file" accept="image/*" onChange={handleImageChange}
               className='block w-full text-sm text-gray-500 file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer'/>
            </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="product-name">Hotel Name</label>
            <input name="hotelName" type="text" placeholder="Type here" value={data.hotelName} onChange={handleChange} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="hotel-address">Hotel Address</label>
            <textarea name="hotelAddress" value={data.hotelAddress} onChange={handleChange} rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="rating">Rating</label>
            <input name="rating" type="text" placeholder="Type here" value={data.rating} onChange={handleChange} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
        </div> 
        <div className="flex flex-col gap-1 w-32">
                <label className="text-base font-medium" htmlFor="price">Price</label>
                <input name="price" type="number" placeholder="0" value={data.price} onChange={handleChange} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="amenities">Amenities</label>
            <textarea name="amenities" value={data.amenities} onChange={handleChange} rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
        </div>

        <button className="px-8 py-2.5 bg-primary text-white font-medium rounded">Register Hotel</button>
    </form>
</div>
  )
}

export default RegisterHotel;
