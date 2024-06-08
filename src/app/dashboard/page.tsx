
"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header";
import Counter from '../components/counter';
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
      <Header title="Service Commercial" showMyAccount={false} showStats={false}/>
      <div className="flex-grow my-5">
        <Counter totalOrderPrice={71}/>
      </div>
      <Footer/>
    </NextUIProvider>
  );
}
