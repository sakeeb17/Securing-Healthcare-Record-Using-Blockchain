import React, { useState } from 'react';
import '../CSS/Contact.css';
import Header from'./Header';


function ContactUs() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission
    console.log('Form submitted:', {
      firstName, 
      lastName,
      email, 
      phone,
      message,
    });
  };

  return (
    <>
    <Header/>
    <section id="section-wrapper">
      <div className="box-wrapper">
        <div className="info-wrap">
          <h2 className="info-title">Contact Information</h2>
          <h3 className="info-sub-title">
            Fill up the form and our Team will get back to you within 24 hours
          </h3>
          <ul className="info-details">
            <li>
              <i className="fas fa-phone-alt"></i>
              <span>Phone:</span> <a href="tel:+ 1235 2355 98">+ 1235 2355 98</a>
            </li>
            <li>
              <i className="fas fa-paper-plane"></i>
              <span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a>
            </li>
            <li>
              <i className="fas fa-globe"></i>
              <span>Website:</span> <a href="/">yoursite.com</a>
            </li>
          </ul>
          <ul className="social-icons">
            <li>
              <a href="/">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="form-wrap3">
          <form3 onSubmit={handleSubmit}>
            <h2 className="form-title">Send us a message</h2>
            <div className="form-fields3">
              <div className="form-group3">
                <input
                  type="text"
                  className="fname"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group3">
                <input
                  type="text"
                  className="lname"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group3">
                <input
                  type="email"
                  className="email"
                  placeholder="Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group3">
                <input
                  type="number"
                  className="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group3">
                <textarea
                  name="message"
                  
                  placeholder="Write your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <input type="submit" value="Send Message" className="submit-button" />
          </form3>
        </div>
      </div>
    </section>
    </>
  );
}

export default ContactUs;