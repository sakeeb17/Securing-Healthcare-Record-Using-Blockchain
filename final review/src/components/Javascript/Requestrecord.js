import React, { useState } from 'react';
import { useMessages } from './contexts/MessageContext';

const MessageSender = () => {
    const { sendMessage } = useMessages();
    const [recipientEmail, setRecipientEmail] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');

    const handleSend = async () => {
        setStatus('Sending...');
        
        try {
            // Send the message through the context
            const message = await sendMessage(recipientEmail, content);
            
            // Handle success case
            if (message) {
                setStatus('Message sent successfully!');
            } else {
                setStatus('Failed to send message.');
            }
        } catch (error) {
            // Handle errors
            setStatus('An error occurred. Please try again.');
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="message-sender">
            <h2>Send a Message</h2>
            <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="Recipient's Email"
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Message Content"
                required
            />
            <button onClick={handleSend}>Send</button>
            <p>{status}</p>
        </div>
    );
};

export default MessageSender;
