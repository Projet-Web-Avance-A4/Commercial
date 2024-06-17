import React, { useEffect, useState } from 'react';
import Notif from '../notification/notification';  

const NewUser: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3002/events');

        eventSource.onmessage = (event) => {
            setShowModal(true);
        };

        eventSource.onerror = (error) => {
            console.error('Erreur :', error);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const closeModal = () => setShowModal(false);

    return (
        <div>
                <Notif
                    title="Nouveau Utilisateur"
                    description={`Un nouvel utilisateur a été ajouté !`}
                    isOpen={showModal}
                    closeModal={closeModal}
                />
        </div>
    );
}

export default NewUser;

