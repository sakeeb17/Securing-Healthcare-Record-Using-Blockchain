import React, { createContext, useContext, useState } from 'react';

// Placeholder function for uploading a message to IPFS
async function uploadMessageToIPFS(message) {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "pinata_api_key": process.env.REACT_APP_PINATA_API_KEY,
            "pinata_secret_api_key": process.env.REACT_APP_PINATA_SECRET_API_KEY,
        },
        body: JSON.stringify({ pinataContent: message }),
    });
    if (!response.ok) {
        throw new Error('Failed to upload message to IPFS');
    }
    const data = await response.json();
    return data.IpfsHash;
}

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messagesByEmail, setMessagesByEmail] = useState({});

    const sendMessage = async (recipientEmail, content) => {
        try {
            const senderEmail = localStorage.getItem('userEmail');
            const message = {
                to: recipientEmail,
                content,
                from: senderEmail,
                timestamp: new Date().toISOString(),
                status: 'Pending',
            };

            const ipfsHash = await uploadMessageToIPFS(message);
            const messageWithHash = { ...message, ipfsHash };

            setMessagesByEmail((prev) => ({
                ...prev,
                [recipientEmail]: [...(prev[recipientEmail] || []), messageWithHash],
            }));

            return messageWithHash;
        } catch (error) {
            console.error('Error uploading message to IPFS:', error);
            throw new Error('Failed to send message.');
        }
    };

    const updateMessageWithResponse = async (updatedMessage) => {
        try {
            // Update the message with the receiver's response
            const messageWithResponse = {
                ...updatedMessage,
                status: 'Approved',
            };

            // Upload the updated message to IPFS and get the new hash
            const ipfsHash = await uploadMessageToIPFS(messageWithResponse);

            setMessagesByEmail((prev) => {
                const updatedMessages = prev[updatedMessage.to].map((msg) =>
                    msg.ipfsHash === updatedMessage.ipfsHash
                        ? { ...msg, response: updatedMessage.response, status: 'Approved', hash: ipfsHash }
                        : msg
                );

                return {
                    ...prev,
                    [updatedMessage.to]: updatedMessages,
                };
            });
        } catch (error) {
            console.error('Error updating message with response:', error);
            throw new Error('Failed to update message with response.');
        }
    };

    const getMessagesForUser = (email) => messagesByEmail[email] || [];

    return (
        <MessageContext.Provider value={{ sendMessage, getMessagesForUser, updateMessageWithResponse }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => useContext(MessageContext);
