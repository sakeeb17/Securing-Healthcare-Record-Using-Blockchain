import React, { useState } from 'react';
import '../CSS/Login.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { ethers } from 'ethers'; // Correctly import ethers
import axios from 'axios';
import contractABI from './contractABI.json'; // Import your contract ABI

const CONTRACT_ADDRESS = '0x534ea23a858eC48e465dC020B32f9AeAB63Bff64'; // Replace with your deployed contract address
const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY; // Your Pinata API key
const PINATA_SECRET_API_KEY = process.env.REACT_APP_PINATA_SECRET_API_KEY; // Your Pinata secret API key

export default function Login() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [isBtnScaled, setIsBtnScaled] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleOverlayBtnClick = () => {
        setIsRightPanelActive(!isRightPanelActive);
        setIsBtnScaled(false);
        window.requestAnimationFrame(() => {
            setIsBtnScaled(true);
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Step 1: Upload user details to IPFS
        const userDetails = { name, email, password };
        const data = JSON.stringify({
            pinataMetadata: {
                name: "User Details",
            },
            pinataContent: userDetails,
        });

        const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    pinata_api_key: PINATA_API_KEY,
                    pinata_secret_api_key: PINATA_SECRET_API_KEY,
                },
            });

            const ipfsHash = response.data.IpfsHash;
            alert(`Sign up successfully uploaded to IPFS! IPFS Hash: ${ipfsHash}`);

            // Step 2: Sign up on Ethereum and send 0.001 ether
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner(); // Make sure to await this
            const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

            const tx = await contract.signUp({ value: ethers.parseEther("0.001","ether") }); // Change to parseEther
            await tx.wait(); // Wait for the transaction to be mined

            alert('Sign Up successful!');

            // Save user details and IPFS hash to localStorage if needed
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            localStorage.setItem('ipfsHash', ipfsHash); // Store IPFS hash in local storage if needed

            // Redirect to profile page on successful sign-up
            navigate('/Reseacherprofile');
        } catch (error) {
            console.error('Error during sign-up:', error);
            alert('Failed to sign up. Please try again.');
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        // Step 1: Sign in on Ethereum and send 0.001 ether
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(); // Make sure to await this
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

        try {
            const tx = await contract.signUp({ value: ethers.parseEther("0.001","ether") }); // Change to parseEther
            await tx.wait(); // Wait for the transaction to be mined

            alert('Sign In successful!');

            localStorage.setItem('userEmail', signInEmail);
            // Redirect to profile page on successful sign-in
            navigate('/Reseacherprofile');
        } catch (error) {
            console.error('Error during sign-in:', error);
            alert('Failed to sign in. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <div className="body4">
                <div className={`container4 ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container4">
                    {/* Sign Up Form */}
                    <div className="form-container4 sign-up-container">
                        <form className="form4" onSubmit={handleSignUp}>
                            <h1>Create Account</h1>
                            <div className="social-container">
                                <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <div className="infield">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className="label4"></label>
                            </div>
                            <div className="infield">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="label4"></label>
                            </div>
                            <div className="infield">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label className="label4"></label>
                            </div>
                            <button className="Button4" type="submit">Sign Up</button>
                        </form>
                    </div>

                    {/* Sign In Form */}
                    <div className="form-container4 sign-in-container">
                        <form onSubmit={handleSignIn}>
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span>
                            <div className="infield">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={signInEmail}
                                    onChange={(e) => setSignInEmail(e.target.value)}
                                />
                                <label className="label4"></label>
                            </div>
                            <div className="infield">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={signInPassword}
                                    onChange={(e) => setSignInPassword(e.target.value)}
                                />
                                <label className="label4"></label>
                            </div>
                            <a href="/" className="forgot">Forgot your password?</a>
                            <br />
                            <button className="Button4" type="submit">Sign In</button>
                        </form>
                    </div>

                    {/* Overlay for toggling panels */}
                    <div className="overlay-container" id="overlayCon">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start your journey with us</p>
                                <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
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
    );
}
