
"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header";
import Table from "../components/table";
import Footer from "../components/footer";
import CustomCard from "../components/customcard";
import PortalCard from "../components/portalCard";
import Notification from "../components/notification";
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
      <div className="flex-grow my-5 mx-2 text-black">
        <p>Client</p>
        <Table showStatusAction={true} showCreateAction={false} showEditAction={true} showDeleteAction={true}/>
        <p>Commandes</p>
        <Table showStatusAction={true} showCreateAction={false} showEditAction={true} showDeleteAction={true}/>
      </div>
      <Footer/>
    </NextUIProvider>
  );
}
