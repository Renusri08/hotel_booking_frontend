import { createContext ,useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import React from "react";
// import { roomsData} from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";



const axiosInstance = axios.create({
  baseURL: "https://hotel-booking-backend-drx1.onrender.com",  // ✅ Correct
  withCredentials: true
});





/**createContext → creates a React Context object, 
 which allows us to share values (like state or functions) 
 across multiple components without prop drilling. */

 /** useNavigate → React Router hook that gives you a function navigate()
   which lets you redirect users programmatically (e.g., navigate("/home")). */

export  const AppContext = createContext();

const AppContextProvider = ({children}) => {
  /**({children}) → props destructuring. children refers to whatever 
   components are wrapped inside this provider. Example:

<AppContextProvider>
  <App />
</AppContextProvider> */
 

/**
 * createContext() just creates an empty container (a pipe) that by itself holds nothing.

When you wrap components with <AppContext.Provider value={...}>, you fill that container with the value you pass.

Inside child components, useContext(AppContext) reads the value from the nearest provider.

If no provider is present, it just returns the default (or undefined if none was set).
 */


  const navigate=useNavigate();
  const [user,setUser]=useState(false);
  const [owner,setOwner]=useState(false);
  const [hotelData,setHotelData]=useState([]);
  const [roomData,setRoomData]=useState([]);


  const checkUserLoggedInOrNot = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/is-auth");
  
      if (data.success) {
        console.log(data.user);  // Log the user details
  
        if (data.user.role === "user") {
          console.log(data.user.role);
          setUser(true); 
          setOwner(false); 
          navigate("/")// Set state indicating a regular user is logged in
        } else if (data.user.role === "owner") {
          console.log(data.user.role);
          setOwner(true);
          setUser(false); 
          navigate("/owner")// Set state indicating an owner is logged in
        }
      }
 
    } catch (error) {
      console.error("Auth check failed:", error);
    }
    
  };
  

  const fetchHotelsData=async()=>{
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
 console.log("user:",user);

 
  const fetchRoomsData=async()=>{
     try{
          const {data}=await axiosInstance.get("/api/room/get-all");
          if(data.success){
            setRoomData(data.rooms);
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
    checkUserLoggedInOrNot();
    fetchHotelsData();
    fetchRoomsData();
    
  },[])

  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);
  
  useEffect(() => {
    console.log("Owner state changed:", owner);
  }, [owner]);

  const refreshAllData = () => {
    fetchHotelsData();
    fetchRoomsData();
    // You might also want to refresh user data if a user-related action happens
    // checkUserLoggedInOrNot();
  };


 

  const value = {navigate,user,setUser,owner,setOwner,hotelData,setHotelData,roomData,setRoomData,axiosInstance,refreshAllData};
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};



export default AppContextProvider;
