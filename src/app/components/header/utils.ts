import { useState } from 'react';

export const useModal = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

    function openDeleteModal() {
        setIsDeleteModalOpen(true);
    }

    function closeDeleteModal() {
        setIsDeleteModalOpen(false);
    }

    function openSponsorModal() {
        setIsSponsorModalOpen(true);
    }

    function closeSponsorModal() {
        setIsSponsorModalOpen(false);
    }

    return {
        isDeleteModalOpen,
        isSponsorModalOpen,
        openDeleteModal,
        closeDeleteModal,
        openSponsorModal,
        closeSponsorModal,

    };
};
