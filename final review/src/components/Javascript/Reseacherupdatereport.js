import React, { useState,useEffect } from "react";
import "../CSS/Reseacher.css";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ethers } from "ethers";
import contractABI from "./contractABI2.json";

const Reseacherupdatereport=({existingData})=>{
    const [formData, setFormData] = useState({
        patientFirstName: "",
        patientMiddleName: "",
        patientLastName: "",
        phoneNumber: "",
        hospitalName: "",
        doctorFirstName: "",
        doctorMiddleName: "",
        doctorLastName: "",
        date: "",
        time: "",
        investigationReport: "",
      });
   
  const [files, setFiles] = useState([]); // Keep track of uploaded files
  const [ipfsHash, setIpfsHash] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const contractAddress = "0x20FC57D720752AAC44D61bC706c3bc386C5d3Ab4";

  useEffect(() => {
    if (existingData) {
        setFormData((prevState) => ({
            ...prevState,
            ...existingData,
            conditions: existingData.conditions || [],
            symptoms: existingData.symptoms || [],
        }));
    }
}, [existingData]);
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles); // Update the state with dropped files
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const updateDatabaseWithExistingHash = async (existingIpfsHash, updatedData) => {
    console.log("Updating database with existing IPFS hash:", existingIpfsHash);
    try {
        await axios.post('/your-endpoint-to-update', { ipfsHash: existingIpfsHash, updatedData });
        console.log("Database updated successfully!");
    } catch (error) {
        console.error("Error updating database:", error);
    }
};
const handleSubmit = async (e) => {
    e.preventDefault();

    const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
    const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;

    await payWithEther();

    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      // Loop through the files and append them to FormData
      files.forEach(file => {
        formData.append("file", file); // Use the correct field name expected by Pinata
      });

      // Add other form data to the FormData object if needed
      Object.entries(formData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Upload files to Pinata
      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
          "Content-Type": "multipart/form-data",
        },
      });

      const newIpfsHash = response.data.IpfsHash;
      console.log("Data uploaded successfully to IPFS:", newIpfsHash);
      setIpfsHash(newIpfsHash); // Save the IPFS hash to state
      setShowAlert(true); // Show the alert
      if (existingData?.ipfsHash) {
        await updateDatabaseWithExistingHash(existingData.ipfsHash, formData);
    } else {
        alert(`Your medical history data has been uploaded! IPFS Hash: ${newIpfsHash}`);

        // Interact with the smart contract
         // Call the smart contract payment function
    }
    } catch (error) {
      console.error("Error uploading data to IPFS:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
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


const copyToClipboard = () => {
    navigator.clipboard.writeText(ipfsHash)
        .then(() => {
            alert(`IPFS Hash copied to clipboard: ${ipfsHash}`);
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
            alert("Failed to copy IPFS hash.");
        });
};
return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>MEDICAL FORM FOR RESEARCH STUDY</h2>
        
        <div className="form-field">
          <label>Patient Name *</label>
          <div className="name-fields">
            <input name="patientFirstName" placeholder="First Name" onChange={handleChange} />
            <input name="patientMiddleName" placeholder="Middle Name" onChange={handleChange} />
            <input name="patientLastName" placeholder="Last Name" onChange={handleChange} />
          </div>
        </div>

        <div className="form-field">
          <label>Patient's Phone Number *</label>
          <input name="phoneNumber" placeholder="(000) 000-0000" onChange={handleChange} />
          <small>Please enter a valid phone number.</small>
        </div>

        <div className="form-field">
          <label>HOSPITAL NAME</label>
          <input name="hospitalName" onChange={handleChange} />
        </div>

        <div className="form-field">
          <label>Doctor Name *</label>
          <div className="name-fields">
            <input name="doctorFirstName" placeholder="First Name" onChange={handleChange} />
            <input name="doctorMiddleName" placeholder="Middle Name" onChange={handleChange} />
            <input name="doctorLastName" placeholder="Last Name" onChange={handleChange} />
          </div>
        </div>

        <div className="form-field">
          <label>Date & Time</label>
          <div className="date-time-fields">
            <input name="date" type="date" onChange={handleChange} />
            <input name="time" type="time" onChange={handleChange} />
          </div>
        </div>
        
        <div className="form-field">
          <label>Select Investigation Report *</label>
          <select name="investigationReport" onChange={handleChange}>
            <option value="">Select Investigation Report</option>
            <option value="Blood Test">Blood Test</option>
            <option value="X-Ray">X-Ray</option>
            <option value="MRI">MRI</option>
            <option value="CT Scan">CT Scan</option>
          </select>
        </div>

        <div className="form-field">
          <label>Upload All Investigation Report *</label>
          <div className="dropzone-container" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Browse Files</p>
            <small>Drag and drop files here</small>
          </div>
        </div>

        <button className="submit-button" type="submit">Submit</button>
      </form>

      {showAlert && (
        <div className="alert">
          <p>Your medical history data has been uploaded! IPFS Hash: <strong>{ipfsHash}</strong></p>
          <button onClick={copyToClipboard}>Copy Hash</button>
          <button onClick={() => setShowAlert(false)}>Close</button>
        </div>
      )}
    </>
  );
  
};
export default Reseacherupdatereport;