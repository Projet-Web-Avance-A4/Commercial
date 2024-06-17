"use client";
import React from 'react';
import NotificationNewUser from '../components/newUser/newUser';
import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import CustomCard from "../components/customcard/customcard";
import { useState, useEffect } from 'react';
import { FaUserLarge, FaChartColumn } from 'react-icons/fa6';

export default function Home() {
 

  return (
    <NextUIProvider className="flex flex-col min-h-screen bg-beige">
      <Header title="Service Commercial" showMyAccount={true} showStats={false}/>
      <div className="grid grid-cols-1 md:grid-cols-4 flex-grow place-content-center items-center h-80">
        <div className="col-span-1"></div>
        <div>
          <CustomCard title="Clients" href="/clients" btnText="Accéder" icon={<FaUserLarge className="w-24 h-24" />} />
        </div>
        <div>
          <CustomCard title="Dashboard" href="/dashboard" btnText="Accéder" icon={<FaChartColumn className="w-24 h-24" />} />
        </div>
      </div>
      <NotificationNewUser />
      <Footer />
    </NextUIProvider>
  );
}