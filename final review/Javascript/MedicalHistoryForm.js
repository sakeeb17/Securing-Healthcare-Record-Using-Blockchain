import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from "ethers";
import '../CSS/Patientreport.css';
import contractABI from "./contractABI2.json";

const MedicalHistoryForm = ({ existingData }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        age: "",
        gender: "",
        contact_number: "",
        email: "",
        street_address: "",
        street_address2: "",
        city: "",
        state: "",
        postal_code: "",
        weight: "",
        height: "",
        blood_group: "",
        medical_care: "",
        drug_allergies: "",
        food_allergies: "",
        restricted_eating: "",
        diagnosis_documents: null,
        conditions: [],
        symptoms: [],
        medication: "",
        medication_list: "",
        emergency_first_name: "",
        emergency_last_name: "",
        relationship: "",
        emergency_phone: "",
        agree: false,
    });

    const [ipfsHash, setIpfsHash] = useState(""); // State to store the IPFS hash
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
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            if (name === "conditions" || name === "symptoms") {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: checked
                        ? [...prevState[name], value]
                        : prevState[name].filter((item) => item !== value),
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    [name]: checked,
                }));
            }
        } else if (type === "file") {
            setFormData((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

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
            const metadata = {
                pinataMetadata: {
                    name: `${formData.first_name} ${formData.last_name}`,
                },
                pinataContent: formData,
            };

            // Upload data to IPFS
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

            const newIpfsHash = response.data.IpfsHash;
            console.log("Data uploaded successfully to IPFS:", newIpfsHash);
            setIpfsHash(newIpfsHash); // Save the IPFS hash to state
            setShowAlert(true); // Show the alert
            setIpfsHash(newIpfsHash); // Set the IPFS hash state

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
            alert("There was an error submitting the form. Please try again.");
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
            <form onSubmit={handleSubmit}>
                <h2 className="prh2">Patient personal data</h2>
                <div className="row5">
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input className="prinput"
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input className="prinput"
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                    </div>
                </div>

                <div className="row5">
                    <div>
                        <label htmlFor="age">What is your age?</label>
                        <input className="prinput"
                            type="text"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="ex: 23"
                        />
                    </div>
                    <div>
                        <label htmlFor="gender">What is your gender?</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Please Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="row5">
                    <div>
                        <label htmlFor="contact_number">Contact Number</label>
                        <input className="prinput"
                            type="tel"
                            id="contact_number"
                            name="contact_number"
                            value={formData.contact_number}
                            onChange={handleChange}
                            placeholder="(000) 000-0000"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input className="prinput"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@example.com"
                        />
                    </div>
                </div>

                <h3 className="prh3">Address</h3>
                <div className="row5 full-width">
                    <label htmlFor="street_address">Street Address</label>
                    <input className="prinput"
                        type="text"
                        id="street_address"
                        name="street_address"
                        value={formData.street_address}
                        onChange={handleChange}
                        placeholder="Street Address"
                    />
                </div>
                <div className="row5 full-width">
                    <label htmlFor="street_address2">Street Address Line 2</label>
                    <input className="prinput"
                        type="text"
                        id="street_address2"
                        name="street_address2"
                        value={formData.street_address2}
                        onChange={handleChange}
                        placeholder="Street Address Line 2"
                    />
                </div>
                <div className="row5">
                    <div className="half-width">
                        <label htmlFor="city">City</label>
                        <input className="prinput"
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                        />
                    </div>
                    <div className="half-width">
                        <label htmlFor="state">State</label>
                        <input className="prinput"
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                        />
                    </div>
                </div>
                <div className="row5">
                    <div className="half-width">
                        <label htmlFor="postal_code">Postal Code</label>
                        <input className="prinput"
                            type="text"
                            id="postal_code"
                            name="postal_code"
                            value={formData.postal_code}
                            onChange={handleChange}
                            placeholder="Postal Code"
                        />
                    </div>
                </div>

                <h3 className="prh3">Medical History</h3>
                <div className="row5">
                    <div>
                        <label htmlFor="weight">Weight</label>
                        <input className="prinput"
                            type="text"
                            id="weight"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="Weight"
                        />
                    </div>
                    <div>
                        <label htmlFor="height">Height</label>
                        <input className="prinput"
                            type="text"
                            id="height"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            placeholder="Height"
                        />
                    </div>
                </div>
                <div className="row5">
                    <div>
                        <label htmlFor="blood_group">Blood Group</label>
                        <input className="prinput"
                            type="text"
                            id="blood_group"
                            name="blood_group"
                            value={formData.blood_group}
                            onChange={handleChange}
                            placeholder="Blood Group"
                        />
                    </div>
                    <div>
                        <label htmlFor="medical_care">Current Medical Care</label>
                        <input className="prinput"
                            type="text"
                            id="medical_care"
                            name="medical_care"
                            value={formData.medical_care}
                            onChange={handleChange}
                            placeholder="Current Medical Care"
                        />
                    </div>
                </div>
                <div className="row5">
                    <div>
                        <label htmlFor="drug_allergies">Drug Allergies</label>
                        <input className="prinput"
                            type="text"
                            id="drug_allergies"
                            name="drug_allergies"
                            value={formData.drug_allergies}
                            onChange={handleChange}
                            placeholder="Drug Allergies"
                        />
                    </div>
                    <div>
                        <label htmlFor="food_allergies">Food Allergies</label>
                        <input className="prinput"
                            type="text"
                            id="food_allergies"
                            name="food_allergies"
                            value={formData.food_allergies}
                            onChange={handleChange}
                            placeholder="Food Allergies"
                        />
                    </div>
                </div>
                <div className="row5">
                    <div>
                        <label htmlFor="restricted_eating">Restricted Eating</label>
                        <input className="prinput"
                            type="text"
                            id="restricted_eating"
                            name="restricted_eating"
                            value={formData.restricted_eating}
                            onChange={handleChange}
                            placeholder="Restricted Eating"
                        />
                    </div>
                    <div>
                        <label htmlFor="diagnosis_documents">Diagnosis Documents</label>
                        <input
                            type="file"
                            id="diagnosis_documents"
                            name="diagnosis_documents"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <h3 className="prh3">Emergency Contact</h3>
                <div className="row5">
                    <div>
                        <label htmlFor="emergency_first_name">First Name</label>
                        <input className="prinput"
                            type="text"
                            id="emergency_first_name"
                            name="emergency_first_name"
                            value={formData.emergency_first_name}
                            onChange={handleChange}
                            placeholder="Emergency Contact First Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="emergency_last_name">Last Name</label>
                        <input className="prinput"
                            type="text"
                            id="emergency_last_name"
                            name="emergency_last_name"
                            value={formData.emergency_last_name}
                            onChange={handleChange}
                            placeholder="Emergency Contact Last Name"
                        />
                    </div>
                </div>
                <div className="row5">
                    <div>
                        <label htmlFor="relationship">Relationship</label>
                        <input className="prinput"
                            type="text"
                            id="relationship"
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleChange}
                            placeholder="Relationship"
                        />
                    </div>
                    <div>
                        <label htmlFor="emergency_phone">Phone Number</label>
                        <input className="prinput"
                            type="tel"
                            id="emergency_phone"
                            name="emergency_phone"
                            value={formData.emergency_phone}
                            onChange={handleChange}
                            placeholder="Emergency Contact Phone Number"
                        />
                    </div>
                </div>

                <div className="row5">
                    <label>
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                        />
                        I agree to the terms and conditions
                    </label>
                </div>

                <button type="submit" className="submit-button">Submit</button>
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

export default MedicalHistoryForm;
