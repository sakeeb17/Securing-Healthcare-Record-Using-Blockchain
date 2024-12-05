import React from 'react';
import Header from './Header'
import '../CSS/Aboutus.css'
import logo from '../images/Aboutus.jpg';
export default function Aboutus() {
  return (
    <>
    <Header/>
    <div className="head2">
        <div className="heading2">
        <h1>About Us</h1>
        <p1>Harnessing Blockchain to Protect Patient Healthcare Records</p1>
        </div>
        <div className="container2">
            <div className="about-image2">
              <img src={logo} alt="Logo" />
            </div>
            <div className="about-content2">
              <p1>
              We are a dedicated team of tech, healthcare, and security experts focused on securing patient healthcare records with blockchain technology. Our platform offers educational content, case studies, research, and resources to promote data privacy and transparency in healthcare. We aim to protect patient data, improve healthcare outcomes, and foster a collaborative community to revolutionize healthcare security. Join us on this transformative journey.
              </p1>
              <a href="https://www.google.co.in/" className="read-more2">
                Read More
              </a>
            </div>
      
        </div>
    </div>
    </>
  )
}
