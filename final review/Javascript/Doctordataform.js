import React, { useState, useEffect } from "react";
import axios from "axios";
import {ethers} from "ethers";
import "../CSS/Doctorreport.css"; // Import the CSS file
import contractABI from "./contractABI2.json";

const DoctorNoteTemplate = ({ existingData }) => {
  // State to hold form data and IPFS hash
  const [formData, setFormData] = useState({
    doctorFirstName: "",
    doctorLastName: "",
    title: "",
    clinicName: "",
    doctorPhoneNumber: "",
    patientFirstName: "",
    patientLastName: "",
    gender: "",
    age: "",
    email: "",
    patientPhoneNumber: "",
    treatmentDate: "",
    diagnosis: "",
    diagnosisDescription: "",
    medicalAdvice: "",
    signature: "",
  });

  const [ipfsHash, setIpfsHash] = useState(""); // State for IPFS hash
  const [showAlert, setShowAlert] = useState(false); // State for alert visibility
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const contractAddress = "0x20FC57D720752AAC44D61bC706c3bc386C5d3Ab4";

  // Populate the form with existing data if provided
  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    setErrorMessage(""); // Clear previous error message

    const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
    const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;

    await payWithEther();

    const metadata = {
      pinataMetadata: {
        name: `${formData.doctorFirstName} ${formData.doctorLastName} - Doctor Note`,
      },
      pinataContent: formData,
    };

    try {
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
      setIpfsHash(hash); // Save the IPFS hash to state
      setShowAlert(true); // Show success alert
    } catch (error) {
      setErrorMessage("Error uploading data to IPFS.");
      console.error("Error uploading data to IPFS:", error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const payWithEther = async () => {
    try {
      // Request wallet connection (MetaMask)
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request accounts from MetaMask

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Sending 0.002 Ether
      const tx = await contract.pay({ value: ethers.parseEther("0.002") });
      await tx.wait(); // Wait for transaction to be mined

      console.log("Payment successful!");
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };
  
  // Copy IPFS hash to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(ipfsHash)
      .then(() => {
        alert("IPFS Hash copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="form-container6">
      <h1>Doctor's Note Template</h1>
      <form onSubmit={handleSubmit}>
        {/* Doctor's Name */}
        <h3>Doctor's Name</h3>
        <div className="input-row6">
          <input
            type="text"
            name="doctorFirstName"
            placeholder="First Name"
            value={formData.doctorFirstName}
            onChange={handleChange}
            className="input-half6"
          />
          <input
            type="text"
            name="doctorLastName"
            placeholder="Last Name"
            value={formData.doctorLastName}
            onChange={handleChange}
            className="input-half6"
          />
        </div>

        {/* Title */}
        <h3>Title</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        {/* Clinic/Hospital Name */}
        <h3>Clinic/Hospital Name</h3>
        <input
          type="text"
          name="clinicName"
          placeholder="Clinic/Hospital Name"
          value={formData.clinicName}
          onChange={handleChange}
        />

        {/* Doctor's Phone Number */}
        <h3>Phone Number</h3>
        <input
          type="text"
          name="doctorPhoneNumber"
          placeholder="(000) 000-0000"
          value={formData.doctorPhoneNumber}
          onChange={handleChange}
        />

        {/* Patient's Name */}
        <h3>Patient Name</h3>
        <div className="input-row6">
          <input
            type="text"
            name="patientFirstName"
            placeholder="First Name"
            value={formData.patientFirstName}
            onChange={handleChange}
            className="input-half6"
          />
          <input
            type="text"
            name="patientLastName"
            placeholder="Last Name"
            value={formData.patientLastName}
            onChange={handleChange}
            className="input-half6"
          />
        </div>

        {/* Gender and Age */}
        <h3>Gender & Age</h3>
        <div className="input-row6">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input-half6"
          >
            <option value="">Please Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="age"
            placeholder="Age (e.g., 23)"
            value={formData.age}
            onChange={handleChange}
            className="input-half6"
          />
        </div>

        {/* Email and Phone Number */}
        <h3>Contact Information</h3>
        <div className="input-row6">
          <input
            type="email"
            name="email"
            placeholder="Email (e.g., example@example.com)"
            value={formData.email}
            onChange={handleChange}
            className="input-half6"
          />
          <input
            type="text"
            name="patientPhoneNumber"
            placeholder="Phone Number (000) 000-0000"
            value={formData.patientPhoneNumber}
            onChange={handleChange}
            className="input-half6"
          />
        </div>

        {/* Treatment Date */}
        <h3>Treatment Date</h3>
        <input
          type="text"
          name="treatmentDate"
          placeholder="DD-MM-YYYY"
          value={formData.treatmentDate}
          onChange={handleChange}
        />

        {/* Medical Diagnosis */}
        <h3>Medical Diagnosis</h3>
        <input
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
        />

        {/* Description of Medical Diagnosis */}
        <h3>Description of the Medical Diagnosis</h3>
        <textarea
          name="diagnosisDescription"
          value={formData.diagnosisDescription}
          onChange={handleChange}
        />

        {/* Medical Advice/Prescription */}
        <h3>Medical Advice/Prescription</h3>
        <textarea
          name="medicalAdvice"
          value={formData.medicalAdvice}
          onChange={handleChange}
        />

        {/* Signature */}
        <h3>Signature</h3>
        <textarea
          name="signature"
          placeholder="Sign Here"
          value={formData.signature}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <div className="submit-container6">
          <button type="submit" className="prb" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Success Alert */}
      {showAlert && (
        <div className="alert-container">
          <p>
            Data uploaded successfully! <br />
            IPFS Hash: {ipfsHash}
          </p>
          <button onClick={copyToClipboard}>Copy Hash to Clipboard</button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default DoctorNoteTemplate;
