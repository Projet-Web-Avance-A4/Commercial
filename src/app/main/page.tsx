"use client";

import { NextUIProvider } from "@nextui-org/system";
import CustomCard from "../components/customcard/customcard";
import { useState, useEffect } from 'react';
import { FaUserLarge, FaChartColumn } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useHeader } from '../hooks/useHeader';
import { decodeAccessToken} from './utils';

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
  const { user, setUser, setShowMyAccount, setShowStats, setShowSponsor } = useHeader();

  
const router = useRouter();


useEffect(() => {
  const setInHeader = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error("Token non trouvé");
      }

      const userData = await decodeAccessToken(accessToken);
      setUser(userData);

      if (userData) {
        setShowMyAccount(true);
        setShowStats(true);
        setShowSponsor(true);
      } else {
        throw new Error("Utilisateur non connecté");
      }
    } catch (error) {
      router.push('/');
    }
  };

  setInHeader();
}, []);

/*   useEffect(() => {
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
 */
  return (
    <NextUIProvider className="flex flex-col min-h-screen bg-beige">
      <div className="grid grid-cols-1 md:grid-cols-4 flex-grow place-content-center items-center h-80">
        <div className="col-span-1"></div>
        <div>
          <CustomCard title="Clients" href="/clients" btnText="Accéder"  icon={<FaUserLarge className="w-12 h-12 xl:w-20 xl:h-20" />} />
        </div>
        <div>
          <CustomCard title="Dashboard" href="/dashboard" btnText="Accéder" icon={<FaChartColumn className="w-12 h-12 xl:w-20 xl:h-20" />} />
        </div>
      </div>
    </NextUIProvider>
  );
}
