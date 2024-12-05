import React, { useState, useEffect } from 'react';
import { useMessages } from './contexts/MessageContext';

const Approve = () => {
    const { getMessagesForUser, updateMessageWithResponse } = useMessages();
    const [messages, setMessages] = useState([]);
    const [approvedMessage, setApprovedMessage] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const userMessages = getMessagesForUser(email);
        setMessages(userMessages);
    }, [getMessagesForUser]);

    const handleApprove = (message) => {
        setApprovedMessage(message);
    };

    const handleDeny = (message) => {
        const deniedMessage = { ...message, status: 'Denied' };
        setMessages((prevMessages) => {
            return prevMessages.map((msg) =>
                msg.ipfsHash === message.ipfsHash ? deniedMessage : msg
            );
        });
    };

    const handleResponseSubmit = async (e) => {
        e.preventDefault();
        const updatedMessage = {
            ...approvedMessage,
            status: 'Approved',
            response: responseMessage,
        };

        await updateMessageWithResponse(updatedMessage);
        setResponseMessage('');
        setApprovedMessage(null);
    };

    const handleCopyMessage = (message) => {
        navigator.clipboard.writeText(message.response).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="approve">
            <h2>Approve or Deny Messages</h2>
            {messages.length === 0 ? (
                <p>No messages to approve or deny.</p>
            ) : (
                messages.map((message, index) => (
                    <div key={index} className="message">
                        <p><strong>From:</strong> {message.from}</p>
                        <p><strong>Message:</strong> {message.content}</p>
                        <p><strong>Timestamp:</strong> {message.timestamp}</p>
                        <p><strong>Status:</strong> {message.status}</p>

                        {message.status === 'Pending' && (
                            <div className="actions">
                                <button onClick={() => handleApprove(message)}>Approve</button>
                                <button onClick={() => handleDeny(message)}>Deny</button>
                            </div>
                        )}

                        {message.status === 'Denied' && (
                            <p style={{ color: 'red' }}>This request was denied.</p>
                        )}

                        {message.status === 'Approved' && message.response && (
                            <div className="approved-message">
                                <p><strong>Receiver's Response:</strong> {message.response}</p>
                                <button onClick={() => handleCopyMessage(message)}>
                                    {copied ? 'Message copied!' : 'Copy Receiver\'s Message'}
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}

            {approvedMessage && (
                <div className="approval-input">
                    <h3>Enter your response to the sender:</h3>
                    <form onSubmit={handleResponseSubmit}>
                        <textarea
                            value={responseMessage}
                            onChange={(e) => setResponseMessage(e.target.value)}
                            placeholder="Write your response here"
                            required
                        />
                        <button type="submit">Send Response</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Approve;
