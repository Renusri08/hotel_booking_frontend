import React from 'react';
import {Mail,Lock} from 'lucide-react';
import {Link} from "react-router-dom";
import {useState,useContext} from 'react';
import {AppContext} from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {

  const {setUser,navigate,setOwner,axiosInstance}=useContext(AppContext);
  const [formData,setFormData]=useState({
    email:"",
    password:"",
  });
  
  const onChangeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData, // keep old fields
      [e.target.name]: e.target.value, // update just one field
    }));
  };
  /**
   Functional setFormData
          React lets you pass a function to a state setter:
          setFormData((prevData) => { ... });


      In this case:
          React automatically passes the previous state value as the argument (prevData).
          You return the new state from that function.
          This is especially useful when the new state depends on the old state.
   
   */
  
  /** It’s called computed property name in JavaScript object literals.
It allows you to use a variable’s value as the key of an object. 
SO WE USE [] FOR e.target.name  */

/**
 And here onChangeHandler is not react component it is a js function (callback function)
 callback function:it is a function passed as argument to another component or function
 usage also different: onChangeHandler (directly we can use that function name no need of calling using</>)
 */

 const submitHandler=async(e)=>{
  e.preventDefault();
     const {data}=await axiosInstance.post("/api/user/login",formData);
     if(data.success){
      toast.success(data.message);
      if(data.user.role==="owner"){
        setOwner(true);
        navigate("/owner");
      }
      else{
        setUser(true);
        navigate("/");
      }
     }
     else{
      toast.error(data.message);
     }
  
 }
  return (
    <div>
      <form onSubmit={submitHandler} className="max-w-96 mt-10 w-full mx-auto  text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
            <h1 className="text-heading text-3xl mt-10 font-medium">Login</h1>
            {/** the colors used here heading and paragraph in classes text-heading and text-paragraph are defined in index.css */}
            <p className="text-paragraph text-sm mt-2">Please sign in to continue</p>
            <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                {/**<svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
                </svg>
                here  instead of this svg for email icon we have just used <Mail/> by simply importing it from lucid-react(lucid react icon)*/
                }
                <Mail className='w-4 h-4'/>
                <input type="email" name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email id" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>
        
            <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                {/**<svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                </svg>*/}
                <Lock className='w-4 h-4'/>
                <input type="password" name="password" value={formData.password} onChange={onChangeHandler} placeholder="Password" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>
            <div className="mt-5 text-left text-indigo-500">
                <a className="text-sm" href="#">Forgot password?</a>
            </div>
        
            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity cursor-pointer">
                Login
            </button>
            <p className="text-gray-500 text-sm mt-3 mb-11">Don't have an account?{" "}
              <Link to={'/signup'} className="text-primary">Sign up</Link></p>
        </form>
    </div>
  )
}

export default Login;
