
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
        <div><CustomCard title="Clients" href="#clientpage" btnText="Accéder" icon={<FaUserLarge className="w-10 h-10" />}/></div>
        <div><CustomCard title="Dashboard" href="#dashboardpage" btnText="Accéder" icon={<FaChartColumn className="w-10 h-10"/>}/></div>
      </div>

{/*       <div>
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
