export interface User {
    name: string;
    surname: string;
    street: string;
    city: string;
    postal_code: string;
    phone: string;
    mail: string;
    role: string;
    code_referral: string;
}

export const fieldLabels: { [key in keyof User]: string } = {
    name: 'Prénom',
    surname: 'Nom',
    street: 'Rue',
    city: 'Ville',
    postal_code: 'Code Postal',
    phone: 'Téléphone',
    mail: 'Mail',
    role: 'Rôle',
    code_referral: 'Code Parrainage'
};

export interface deleteUserModalProps {
    isOpen: boolean;
    closeModal: () => void;
    userMail?: string;
}
