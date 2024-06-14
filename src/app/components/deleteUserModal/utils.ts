import { useState } from 'react';

export const UsePassword = () => {
    const [password, setPassword] = useState('');
    return { password, setPassword };
};

export const handleDeleteAccount = async (
    userMail: string | undefined,
    password: string,
) => {
    try {
        const response = await fetch('http://localhost:4000/auth/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail: userMail, password })
        });

        if (response.ok) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/';
        } else {
            console.error('Échec de la suppression du compte');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du compte :', error);
    }
};
