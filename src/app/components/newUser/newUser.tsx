/* import React, { useEffect } from 'react';

const NouveauxUtilisateurs: React.FC = () => {
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3001/events');

        eventSource.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            console.log('New data received:', newData);
            // Mettez à jour votre interface utilisateur avec les nouvelles données reçues
        };

        eventSource.onerror = (error) => {
            console.error('Error:', error);
        };

        // Nettoyer l'événement lors du démontage du composant
        return () => {
            eventSource.close();
        };
    }, []); // Assurez-vous de fournir une dépendance vide pour exécuter cet effet une seule fois après le montage initial

    // Retournez un élément JSX vide ou un message indiquant que le composant est monté
    return null;
}

export default NouveauxUtilisateurs;
 */

import React, { useEffect, useState } from 'react';
import Notif from '../notification/notification';  

interface User {
    id: number;
    name: string;
}

const NouveauxUtilisateurs: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3002/events');

        eventSource.onmessage = (event) => {
            const newUser: User = JSON.parse(event.data);
            console.log('Nouvel utilisateur créé !', newUser);
            setCurrentUser(newUser);
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

export default NouveauxUtilisateurs;

