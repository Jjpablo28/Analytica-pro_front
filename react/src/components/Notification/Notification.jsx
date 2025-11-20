import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setExiting(true);
            setTimeout(onClose, 500); // Coincide con la duración de la animación de salida
        }, 5000); // La notificación dura 5 segundos

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setExiting(true);
        setTimeout(onClose, 500);
    };

    return (
        <div className={`notification ${type} ${exiting ? 'exit' : ''}`}>
            <p className="notification-message">{message}</p>
            <button onClick={handleClose} className="notification-close-btn">
                &times;
            </button>
        </div>
    );
};

export default Notification;
