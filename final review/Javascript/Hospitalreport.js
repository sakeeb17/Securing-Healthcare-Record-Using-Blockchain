import React, { useState } from 'react';
import '../CSS/Hospitalreport.css';
import axios from "axios";
import { ethers } from "ethers";
import contractABI from "./contractABI2.json";

const PersonalDetailsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    sex: '',
    height: '',
    weight: '',
    maritalStatus: '',
    contactNumber: '',
    email: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    takingMedications: '',
    emergencyFirstName: '',
    emergencyLastName: '',
    emergencyRelationship: '',
    emergencyContactNumber: ''
  });

  const [ipfsHash, setIpfsHash] = useState(""); 
  const [showAlert, setShowAlert] = useState(false);
  const contractAddress = "0x20FC57D720752AAC44D61bC706c3bc386C5d3Ab4";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
    const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;

    await payWithEther();

    try {
      const metadata = {
        pinataMetadata: {
          name: `${formData.firstName} ${formData.lastName} - Hospital Note`,
        },
        pinataContent: formData,
      };

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
            "Content-Type": "application/json",
          },
        }
      );

      const hash = response.data.IpfsHash;
      setIpfsHash(hash);
      setShowAlert(true);

    } catch (error) {
      console.error("Error uploading data to IPFS:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const payWithEther = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.pay({ value: ethers.parseEther("0.002") });
      await tx.wait();

      console.log("Payment successful!");
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ipfsHash)
      .then(() => {
        alert("IPFS Hash copied to clipboard!");
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container7">
        <h1>New Patient Enrollment</h1>  
        
        <div className="form-group7">
          <label>First Name</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} />
          <label>Last Name</label>
          <input name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        
        <div className="form-group7">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          <label>Sex</label>
          <select name="sex" value={formData.sex} onChange={handleChange}>
            <option value="">Please Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group7">
          <label>Height (inches)</label>
          <input name="height" value={formData.height} onChange={handleChange} />
          <label>Weight (pounds)</label>
          <input name="weight" value={formData.weight} onChange={handleChange} />
        </div>
        
        <div className="form-group7">
          <label>Marital Status</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option value="">Please Select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>
        
        <div className="form-group7">
          <label>Contact Number</label>
          <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          <label>E-mail</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        
        <div className="form-group7">
          <label>Street Address</label>
          <input name="streetAddress" value={formData.streetAddress} onChange={handleChange} />
          <label>Street Address Line 2</label>
          <input name="streetAddress2" value={formData.streetAddress2} onChange={handleChange} />
        </div>
        
        <div className="form-group7">
          <label>City</label>
          <input name="city" value={formData.city} onChange={handleChange} />
          <label>State / Province</label>
          <input name="stateProvince" value={formData.stateProvince} onChange={handleChange} />
        </div>
        
        <div className="form-group7">
          <label>Postal / Zip Code</label>
          <input name="postalCode" value={formData.postalCode} onChange={handleChange} />
        </div>

        <div className="form-group7">
          <label>Taking any medications, currently?</label>
          <div className="radio-group7">
            <input type="radio" name="takingMedications" value="Yes" checked={formData.takingMedications === 'Yes'} onChange={handleChange} />
            <label>Yes</label>
            <input type="radio" name="takingMedications" value="No" checked={formData.takingMedications === 'No'} onChange={handleChange} />
            <label>No</label>
          </div>
        </div>

        <h3>In case of emergency</h3>
        <div className="form-group7">
          <label>First Name</label>
          <input name="emergencyFirstName" value={formData.emergencyFirstName} onChange={handleChange} />
          <label>Last Name</label>
          <input name="emergencyLastName" value={formData.emergencyLastName} onChange={handleChange} />
        </div>
        
        <div className="form-group7">
          <label>Relationship</label>
          <input name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} />
          <label>Contact Number</label>
          <input name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleChange} />
        </div>

        <div>
          <button type="submit" className="prb">Submit</button>
        </div>
      </form>

      {showAlert && (
        <div className="alert-container">
          <p>
            Data uploaded successfully! <br />
            IPFS Hash: {ipfsHash}
          </p>
          <button onClick={copyToClipboard}>Copy Hash to Clipboard</button>
        </div>
      )}
    </div>
  );
};

export default PersonalDetailsForm;
