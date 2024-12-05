import React ,{useState} from 'react';
import Header from './Header';
import '../CSS/Patientprofile.css';
import image1 from'../images/request.jpg';
import image2 from'../images/Approve.jpg';
import {useNavigate} from 'react-router-dom';
export default function Patientprofile() {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const handleClick1=()=>{
    navigate('/Requestrecord');
    setIsClicked(true);
  }
  const handleClick2=()=>{
    navigate('/Approve');
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
              alt="Request Record"
            />
          </div>
        </div>
        <div className="divider1"></div>
        <div className="name1">Request Record</div>
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
              alt="Approve Request"
            />
          </div>
        </div>
        <div className="divider1"></div>
        <div className="name1">Approve Request</div>
      </div>
      </div>
      
      </div>
    </>
  )
}
