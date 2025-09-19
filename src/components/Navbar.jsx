import React from "react";
import {useContext} from "react";
import {AppContext} from "../context/AppContext";
import { assets } from "../assets/assets";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
    const {navigate,user,setUser,axiosInstance}=useContext(AppContext)
    console.log(user)
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'Rooms', path: '/rooms' },
        { name: 'About', path: '/about' },
    ];

    const ref = React.useRef(null)

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const logout=async()=>{
            const {data}=await axiosInstance.get("/api/user/logout");
            if(data.success){
                toast.success(data.message);
                setUser(false);
                navigate("/");
            }
            else{
                toast.error(data.message)
            }

        }
    

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(ref.current.scrollTop > 10);
        };
        ref.current.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={ref} className="h-18 overflow-y-scroll">
            <p className="w-10 h-[500px]"></p>
            <nav className={`fixed top-0 left-0 bg-orange-500 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={"logo.png"} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link) => (
                        <Link to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </Link>
                    ))}
                   
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    {console.log(user)}
                    {!user ?
                    <button onClick={()=>navigate("/login")}
                     className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"} cursor-pointer`}>
                        Login
                    </button>:(
                    <div className="relative group inline-block">
                        <img src={assets.profile_icon} alt="" className="w-12 h-12 rounded-full cursor-pointer"></img>
                        {/**dropdown */}
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100
                        group-hover:visible invisible transition duration-300 z-50">
                            <ul className="py-2">
                                <li>
                                    <Link to={"/my-bookings"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bookings</Link>
                                </li>
                                <li onClick={logout}>
                                    <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                        )
                }
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}

                   
                    
                    <div className="flex md:hidden items-center gap-4">
                    {!user ?
                    <button onClick={()=>navigate("/login")}
                     className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"} cursor-pointer`}>
                        Login
                    </button>:(
                    <div className="relative group inline-block">
                        <img src={assets.profile_icon} alt="" className="w-12 h-12 rounded-full cursor-pointer"></img>
                        {/**dropdown */}
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100
                        group-hover:visible invisible transition duration-300 z-50">
                            <ul className="py-2">
                                <li>
                                    <Link to={"/my-bookings"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bookings</Link>
                                </li>
                                <li onClick={logout}>
                                    <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                        )
                }
                </div>

                   
                </div>
            </nav>
        </div>
    );
}

export default Navbar;