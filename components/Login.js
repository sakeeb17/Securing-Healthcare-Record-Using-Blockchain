import React,{useState} from 'react'
import './Login.css'
import Header from'./Header'

export default function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isBtnScaled, setIsBtnScaled] = useState(false);

  const handleOverlayBtnClick = () => {
    setIsRightPanelActive(!isRightPanelActive);
    setIsBtnScaled(false);
    window.requestAnimationFrame(() => {
      setIsBtnScaled(true);
    });
  };

  return (
    <>
    <Header/>
    <div className="body4">
    <div className={`container4 ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container4">
        <div className="form-container4 sign-up-container">
            <form4 action="/">
                <h1>Create Account</h1>
                <div className="social-container">
                    <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <div className="infield">
                    <input type="text" placeholder="Name" />
                    <label></label>
                </div>
                <div className="infield">
                    <input type="email" placeholder="Email" name="email"/>
                    <label></label>
                </div>
                <div className="infield">
                    <input type="password" placeholder="Password" />
                    <label></label>
                </div>
                <button>Sign Up</button>
            </form4>
        </div>
        <div className="form-container4 sign-in-container">
            <form4 action="/">
                <h1>Sign in</h1>
                <div className="social-container">
                    <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account</span>
                <div className="infield">
                    <input type="email" placeholder="Email" name="email"/>
                    <label></label>
                </div>
                <div className="infield">
                    <input type="password" placeholder="Password" />
                    <label></label>
                </div>
                <a href="/" className="forgot">Forgot your password?</a>
                <button type="submit">Sign In</button>
            </form4>
        </div>
        <div className="overlay-container" id="overlayCon">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button>Sign Up</button>
                </div>
            </div>
            <button
          id="overlayBtn"
          className={isBtnScaled ? 'btnScaled' : ''}
          onClick={handleOverlayBtnClick}
        ></button>
        </div>
    </div>
    </div>
   
    </>
  )
}
/*
const container = document.getElementById('container');
const overlayCon = document.getElementById('overlayCon');
const overlayBtn = document.getElementById('overlayBtn');

overlayBtn.addEventListener('click',()=> {
  container.classlist.toggle('right-panle-active');

  overlayBtn.classList.remove('btnScaled');
  window.requestAnimationFrame(()=>{overlayBtn.classList.add('btnScaled)
  })
})
 */