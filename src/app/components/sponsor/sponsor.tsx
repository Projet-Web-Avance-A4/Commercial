import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaCircleXmark } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";

interface iNotification {
  isOpen: boolean;
  closeModal: () => void;
  code: any;  // Ajout de la propriété code
}

const Notification: React.FC<iNotification> = ({ isOpen, closeModal, code }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess('Code copié !');
      setTimeout(() => setCopySuccess(''), 2000);  // Reset le message après 2 secondes
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
              <div className="flex flex-col items-center">
                Code Parrainage
              </div>
              </Dialog.Title>
              <p className="mt-2 text-sm text-gray-500 text-center">Votre code parrainage</p>
              <div className="mt-4 flex justify-center">
                <div className="relative text-black w-full">
                  <input 
                    type="text" 
                    value={code} 
                    readOnly 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center"
                    style={{ textAlign: 'center', verticalAlign: 'middle' }}
                  />
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-0 top-0 mt-2 mr-2 text-blue-500 hover:text-blue-700"
                  >
                    <FaCopy className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {copySuccess && <p className="mt-2 text-green-500 text-sm text-center">{copySuccess}</p>}
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  <FaCircleXmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Notification;
