import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import "../CSS/Patientreport.css";
import contractABI from"./contractABI2.json";

const MedicalHistoryForm = () => {
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
  const [ipfsHash, setIpfsHash] = useState(""); // State to hold IPFS hash
  const [showAlert, setShowAlert] = useState(false); // State to control the alert visibility
  const contractAddress = "0x20FC57D720752AAC44D61bC706c3bc386C5d3Ab4";

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

      const response = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
          "Content-Type": "application/json",
        },
      });

      const hash = response.data.IpfsHash;
      setIpfsHash(hash); // Save the IPFS hash to state
      setShowAlert(true); // Show the alert
      

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
        alert("IPFS Hash copied to clipboard!");
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
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
          <label htmlFor="state">State / Province</label>
          <input className="prinput"
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State / Province"
          />
        </div>
      </div>
      <div className="row5 full-width">
        <label htmlFor="postal_code">Postal / Zip Code</label>
        <input className="prinput"
          type="text"
          id="postal_code"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
          placeholder="Postal / Zip Code"
        />
      </div>
      <h3 className="prh3">Medical Data</h3>
      <div className="row5">
        <div>
          <label htmlFor="weight">Weight</label>
          <input className="prinput"
            type="text"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="ex: 23"
          />
          <span className="unit">in kgs</span>
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input className="prinput"
            type="text"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="ex: 23"
          />
          <span className="unit">in feet</span>
        </div> 
      </div>
      <div className="row5 full-width">
        <label htmlFor="blood_group">Blood group</label>
        <select
          id="blood_group"
          name="blood_group"
          value={formData.blood_group}
          onChange={handleChange}
        >
          <option value="">Please Select</option>
          <option value="a_pos">A+</option>
          <option value="a_neg">A-</option>
          <option value="b_pos">B+</option>
          <option value="b_neg">B-</option>
          <option value="ab_pos">AB+</option>
          <option value="ab_neg">AB-</option>
          <option value="o_pos">O+</option>
          <option value="o_neg">O-</option>
        </select>
      </div>
      <p className="prp">Please give information about the patient's health.</p>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Yes</th>
            <th>No</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Are you presently under medical care?</td>
            <td>
              <input className="prinput"
                type="radio"
                name="medical_care"
                value="yes"
                checked={formData.medical_care === "yes"}
                onChange={handleChange}
              />
            </td>
            <td>
              <input className="prinput"
                type="radio"
                name="medical_care"
                value="no"
                checked={formData.medical_care === "no"}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Do you have any drug allergies?</td>
            <td>
              <input className="prinput"
                type="radio"
                name="drug_allergies"
                value="yes"
                checked={formData.drug_allergies === "yes"}
                onChange={handleChange}
              />
            </td>
            <td>
              <input className="prinput"
                type="radio" 
                name="drug_allergies"
                value="no"
                checked={formData.drug_allergies === "no"}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Do you have any food or environmental allergies?</td>
            <td>
              <input className="prinput"
                type="radio"
                name="food_allergies"
                value="yes"
                checked={formData.food_allergies === "yes"}
                onChange={handleChange}
              />
            </td>
            <td>
              <input className="prinput"
                type="radio"
                name="food_allergies"
                value="no"
                checked={formData.food_allergies === "no"}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Have you ever restricted your eating?</td>
            <td>
              <input className="prinput"
                type="radio"
                name="restricted_eating"
                value="yes"
                checked={formData.restricted_eating === "yes"}
                onChange={handleChange}
              />
            </td>
            <td>
              <input className="prinput"
                type="radio"
                name="restricted_eating"
                value="no"
                checked={formData.restricted_eating === "no"}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p>If yes, please upload your diagnosis documents.</p>
      <div className="file-upload">
        <input className="prinputfu"
          type="file"
          id="diagnosis_documents"
          name="diagnosis_documents"
          onChange={handleChange}
        />
        <label htmlFor="diagnosis_documents">Browse Files</label>
      </div>
      <h3 className="prh3">Check the conditions that apply to you or any member of your immediate relatives:</h3>
      <div className="checkbox-group5">
        {["asthma", "cancer", "cardiac_disease", "diabetes", "hypertension", "psychiatric_disorder", "epilepsy", "other"].map(
          (condition) => (
            <label key={condition}>
              <input className="prinput" 
                type="checkbox"
                name="conditions"
                value={condition}
                checked={formData.conditions.includes(condition)}
                onChange={handleChange}
              />{" "}
              {condition.charAt(0).toUpperCase() + condition.slice(1).replace('_', ' ')}
            </label>
          )
        )}
      </div>
      <h3 className="prh3">Check the symptoms that you're currently experiencing:</h3>
      <div className="checkbox-group5">
        {["chest_pain", "respiratory", "cardiac_disease", "cardiovascular", "hematological", "lymphatic", "neurological", "psychiatric", "gastrointestinal", "genitourinary", "weight_gain", "weight_loss", "musculoskeletal", "other"].map(
          (symptom) => (
            <label key={symptom}>
              <input 
                type="checkbox"
                name="symptoms"
                value={symptom}
                checked={formData.symptoms.includes(symptom)}
                onChange={handleChange}
              />{" "}
              {symptom.charAt(0).toUpperCase() + symptom.slice(1).replace('_', ' ')}
            </label>
          )
        )}
      </div>
      <div className="medication-section">
        <h3 className="prh3">Are you currently taking any medication?</h3>
        <label>
          <input className="prinput"
            type="radio"
            name="medication"
            value="yes"
            checked={formData.medication === "yes"}
            onChange={handleChange}
          />{" "}
          Yes
        </label>
        <label>
          <input className="prinput"
            type="radio"
            name="medication"
            value="no"
            checked={formData.medication === "no"}
            onChange={handleChange}
          />{" "}
          No
        </label>
        <p>Please list them.</p>
        <textarea
          name="medication_list"
          value={formData.medication_list}
          onChange={handleChange}
          placeholder="Type here..."
        />
      </div>
      <h3 className="prh3">In case of emergency</h3>
      <div className="row5">
        <div className="half-width">
          <label htmlFor="emergency_first_name">Emergency Contact First Name</label>
          <input className="prinput"
            type="text"
            id="emergency_first_name"
            name="emergency_first_name"
            value={formData.emergency_first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className="half-width">
          <label htmlFor="emergency_last_name">Emergency Contact Last Name</label>
          <input className="prinput"
            type="text"
            id="emergency_last_name"
            name="emergency_last_name"
            value={formData.emergency_last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="row5">
        <div className="half-width">
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
        <div className="half-width">
          <label htmlFor="emergency_phone">Phone Number</label>
          <input className="prinput"
            type="tel"
            id="emergency_phone"
            name="emergency_phone"
            value={formData.emergency_phone}
            onChange={handleChange}
            placeholder="(000) 000-0000"
          />
          <small>Please enter a valid phone number.</small>
        </div>
      </div>
      <div className="privacy-notice">
        <h3>Privacy Notice</h3>
        <p className="prp">
          The health information that you provide is under the protection of the
          federal Health Insurance Portability and Accountability Act (HIPAA).
          We can use your health information for purposes of treatment,
          payment, and health care operations. Under HIPAA, you have the right
          to request restrictions on how we use or disclose your health
          information in certain circumstances, including for treatment,
          payment, or health care operations. We do not have to agree to your
          request unless you request a restriction on disclosures to a health
          plan for purposes of payment or healthcare operations, and the health
          information relates to an item or service for which you, or another
          person on your behalf, have assumed full financial responsibility. If
          we do agree to your restrictions, we will be bound by our agreement
          except in limited circumstances, such as if there is an emergency.
        </p>
        <div className="terms">
          <input className="prinput" 
            type="checkbox"
            id="agree"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
          />
          <label htmlFor="agree">
            I agree to <a href="/">terms & conditions</a>.{" "}
            <span className="required">*</span>
          </label>
        </div>
      </div>
      
      <div className="submit-container5">
        <button type="submit" className="prb">Submit</button>
      </div>
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
