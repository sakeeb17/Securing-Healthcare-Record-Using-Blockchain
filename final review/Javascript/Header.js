import React from 'react'
import '../CSS/Header.css';
import { useNavigate } from "react-router-dom";
export default function Header() {
 const navigate1 = useNavigate();
 const navigate2 = useNavigate();
 const navigate3 = useNavigate();
 const handleClick1 = () => {
  // Use navigate here
  navigate1('/Aboutus');
};
const handleClick2 = () => {
  // Use navigate here
  navigate2('/contactus');
};
const handleClick3 = () =>{
  navigate3('/');
}


  return (
    <div>
     <header className="header">
        <a href="/" className="logo">Logo</a>


        <nav className="navbar">
            <button onClick={handleClick3}>Profile</button>
            <button onClick={handleClick1}>About Us</button>
            <button onClick={handleClick2}>Contact Us</button>
        </nav>
     </header>
    </div>
  )
}
