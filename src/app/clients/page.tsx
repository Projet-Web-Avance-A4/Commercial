"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Table from "../components/table/table";
import Footer from "../components/footer/footer";
import NotificationNewUser from '../components/newUser/newUser';
import { useState } from 'react';

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
      <div className="flex-grow my-5 mx-2">
        <Table showStatusAction={true} showCreateAction={false} showEditAction={true} showDeleteAction={true}/>
      </div>
      <NotificationNewUser />
      <Footer/>
    </NextUIProvider>
  );
}
