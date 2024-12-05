import React ,{useState} from 'react';
import Header from './Header';
import '../CSS/Profile.css';
import image1 from'../images/Patient.jpg';
import image2 from'../images/doctor.jpg';
import image3 from '../images/Hospital.jpg';
import image4 from '../images/Researcher.jpg';
import {useNavigate} from 'react-router-dom';
export default function Profile() {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const handleClick1=()=>{
    navigate('/login');
    setIsClicked(true);
  }
  const handleClick2=()=>{
    navigate('/Doctorlogin');
    setIsClicked(true);
  }
  const handleClick3=()=>{
    navigate('/Hospitallogin');
    setIsClicked(true);
  }
  const handleClick4=()=>{
    navigate('/Reseacherlogin');
    setIsClicked(true);
  }
  const handleMouseLeave = () => {
    setIsClicked(false);
  };
  return (
    <>
     <Header/>
     <div id="body1">
      <div className={`person1 ${isClicked ? 'clicked' : ''}`}
          onClick={handleClick1}
          onMouseLeave={handleMouseLeave}>
        <div className="container1" >
          <div className="container-inner1">
            <img
              className="circle1"
              src={image1}
              alt="Patient"
            />
          </div>
        </div>
        <div className="divider1"></div>
        <div className="name1">Patient</div>
      </div>
      
      <div>
      <div className={`person1 ${isClicked ? 'clicked' : ''}`}
          onClick={handleClick2}
          onMouseLeave={handleMouseLeave}>
        <div className="container1">
          <div className="container-inner1">
            <img
              className="circle1"
              src={image2}
              alt="Doctor"
            />
          </div>
        </div>
        <div className="divider1"></div>
        <div className="name1">Doctor</div>
      </div>
      </div>
      <div>
      <div className={`person1 ${isClicked ? 'clicked' : ''}`}
          onClick={handleClick3}
          onMouseLeave={handleMouseLeave}>
        <div className="container1">
          <div className="container-inner1">
            <img
              className="circle1"
              src={image3}
              alt="Hospitle"
            />
          </div>
        </div>
        <div className="divider1"></div>
        <div className="name1">Hospital</div>
      </div>
      </div>
      
      <div className={`person1 ${isClicked ? 'clicked' : ''}`}
          onClick={handleClick4}
          onMouseLeave={handleMouseLeave}>
        <div className="container1">
          <div className="container-inner1">
            <img
              className="circle1"
              src={image4}
              alt="Resheacher"
            />
          </div>
        </div>
        <div className="divider1"></div>
        <div className="name1">Researcher</div>
      </div>
      </div>
    </>
  )
}
