
"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header";
import Table from "../components/table";
import Footer from "../components/footer";
import CustomCard from "../components/customcard";
import PortalCard from "../components/portalCard";
import Notification from "../components/notification";
import { useState, useEffect } from 'react';
import { FaUserLarge , FaChartColumn } from 'react-icons/fa6';
import { User } from '../types/user';


export default function Home() {


  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/client/getClients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        setUsersList(data);
        console.log(usersList)
        }

        catch(err) {
          console.error(err);
        };
      }
        fetchUsers();
    }, []);

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

      <div className="text-black">
      {usersList ? (
        usersList.map((user) => (
          <div key={user.id_user}>
            <p>Nom: {user.name}</p>
            {/* Ajoutez d'autres champs si nécessaire */}
          </div>
        ))
      ) : (
        <div>No users found</div>
      )}
    </div>


      <div className="flex-grow my-5 mx-2">
        <Table showStatusAction={true} showCreateAction={false} showEditAction={true} showDeleteAction={true}/>
      </div>
      <Footer/>
    </NextUIProvider>
  );
}