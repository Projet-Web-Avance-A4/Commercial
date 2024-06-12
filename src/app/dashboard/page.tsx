
"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Counter from '../components/counter/counter';
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
      <div className="flex-grow my-5">
        <Counter totalOrderPrice={71}/>
      </div>
      <NotificationNewUser />
      <Footer/>
    </NextUIProvider>
  );
}
