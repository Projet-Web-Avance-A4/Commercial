/* 
"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "./components/header";
import Footer from "./components/footer";
import CustomCard from "./components/customcard";
import PortalCard from "./components/portalCard";
import Notification from "./components/notification";
import { useState } from 'react';
import { FaUserLarge , FaChartColumn } from 'react-icons/fa6';

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <NextUIProvider className=" flex flex-col min-h-screen bg-beige">
      <Header title="Service Commercial" showMyAccount={true} showStats={false} showSponsor={true}/>
      <div className="grid grid-cols-4 flex-grow place-content-center items-center h-80">
        <div className="col-span-1"></div>
        <div><CustomCard title="Clients" href="/clients" btnText="Accéder" icon={<FaUserLarge className="w-10 h-10" />}/></div>
        <div><CustomCard title="Dashboard" href="/dashboard" btnText="Accéder" icon={<FaChartColumn className="w-10 h-10"/>}/></div>
        <div><CustomCard title="Test" href="/test" btnText="Accéder"/></div>
      </div>
        <div>
                <a
                    title="Consulter les mentions légales"
                    onClick={openModal}
                    className="cursor-pointer text-blue-500"
                >
                    <span>Notification pop-up</span>
                </a>
                <Notification title="Nouvelle notification" description="Une nouvelle mise à jour est disponible !" isOpen={isModalOpen} closeModal={closeModal} />
        </div> */}
      <Footer/>
    </NextUIProvider>
  );
}
 */

"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "./components/header";
import Footer from "./components/footer";
import CustomCard from "./components/customcard";
import Notification from "./components/notification";
import { useState, useEffect } from 'react';
import { FaUserLarge, FaChartColumn } from 'react-icons/fa6';

const notificationsConfig = [
  {
    id: 'notification1',
    title: 'Nouvelle notification',
    description: 'Une nouvelle mise à jour est disponible !',
    interval: 10000,
  },
  {
    id: 'notification2',
    title: 'Nouvelle commande en cours',
    description: 'Une nouvelle livraison est en cours !',
    interval: 15000,
  }
];

export default function Home() {
  const [modals, setModals] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const intervals = notificationsConfig.map(notification => {
      const interval = setInterval(() => {
        setModals(prevModals => ({ ...prevModals, [notification.id]: true }));
        setTimeout(() => {
          setModals(prevModals => ({ ...prevModals, [notification.id]: false }));
        }, 3000); // Ferme la modal après 3 secondes
      }, notification.interval);
      return interval;
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  const openModal = (id: any) => {
    setModals(prevModals => ({ ...prevModals, [id]: true }));
  };

  const closeModal = (id: any) => {
    setModals(prevModals => ({ ...prevModals, [id]: false }));
  };

  return (
    <NextUIProvider className="flex flex-col min-h-screen bg-beige">
      <Header title="Service Commercial" showMyAccount={true} showStats={false} showSponsor={true} />
      <div className="grid grid-cols-4 flex-grow place-content-center items-center h-80">
        <div className="col-span-1"></div>
        <div>
          <CustomCard title="Clients" href="/clients" btnText="Accéder" icon={<FaUserLarge className="w-10 h-10" />} />
        </div>
        <div>
          <CustomCard title="Dashboard" href="/dashboard" btnText="Accéder" icon={<FaChartColumn className="w-10 h-10" />} />
        </div>
        <div>
          <CustomCard title="Test" href="/test" btnText="Accéder" />
        </div>
      </div>
      <div>
        {notificationsConfig.map(notification => (
          <div key={notification.id}>
            <a
              title="Consulter les mentions légales"
              onClick={() => openModal(notification.id)}
              className="cursor-pointer text-blue-500"
            >
              <span>{notification.title}</span>
            </a>
            <Notification
              title={notification.title}
              description={notification.description}
              isOpen={modals[notification.id] || false}
              closeModal={() => closeModal(notification.id)}
            />
          </div>
        ))}
      </div>
      <Footer />
    </NextUIProvider>
  );
}
