"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Table from "../components/table/table";
import Footer from "../components/footer/footer";
import NotificationNewUser from '../components/newUser/newUser';
import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { Options } from "../interfaces/table";
import { propsTable } from "@/app/interfaces/table";
import deleteUserButton from "../components/actionButtonTable/deleteUserButton";
import editUserButton from "../components/actionButtonTable/editUserButton";
import switchUserState from "../components/actionButtonTable/switchStateButton";

export default function Home() {

  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/client/getClients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        const filteredUsers = data.filter((user: User) => user.status !== "Deleted");
        setUsersList(filteredUsers);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  const INITIAL_VISIBLE_COLUMNS = [
    "name",
    "surname",
    "role",
    "status",
    "actions",
  ];

  const items = usersList.map((user) => (
    {
      id: user.id_user,
      name: user.name,
      surname: user.surname,
      role: user.role,
      status: user.status,
    }
  ));

  const columns = [
    { name: "Nom", uid: "name",sortable: true },
    { name: "Prénom", uid: "surname", sortable: true },
    { name: "Rôle", uid: "role", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Actions", uid: "actions" },
  ];

  const options: Options = {
    content: "client(s) trouvée(s)", 
    search_name: "Chercher par client, rôle", 
    search_uid: ["name", "surname", "role"], 
    selection_mode: "none", 
    option_name: "Status",
    option_uid: "status",
    value_option: [
      { name: "Actif", uid: "Active" },
      { name: "Inactif", uid: "Inactive" },
      { name: "Supprimé", uid: "Deleted" },
    ],
  };

  const props: propsTable = {
    columns: columns,
    options: options,
    items: items,
    INITIAL_VISIBLE_COLUMNS: INITIAL_VISIBLE_COLUMNS,
  }

  return (
    <NextUIProvider className=" flex flex-col min-h-screen bg-beige">
      <Header title="Service Commercial" showMyAccount={true} showStats={false}/>
      <div className="flex-grow my-5 mx-2">
        <Table
          props={props}
          actionButtons={[switchUserState, editUserButton, deleteUserButton]}
        />
      </div>
      <NotificationNewUser />
      <Footer/>
    </NextUIProvider>
  );
}
