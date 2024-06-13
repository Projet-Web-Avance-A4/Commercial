"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Table from "../components/table/table";
import Footer from "../components/footer/footer";
import { useState, useEffect } from 'react';
import { data } from "../api/temp.data";
import { User } from '../types/user';
import { Options } from "../interfaces/table";
import { propsTable } from "@/app/interfaces/table";
import deleteUserButton from "../components/actionButtonTable/deleteUserButton"
import editUserButton from "../components/actionButtonTable/editUserButton"
import switchUserState from "../components/actionButtonTable/switchStateButton"


export default function Home() {

  
const [usersList, setUsersList] = useState<User[]>([]);

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
      console.log(data);
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
  { name: "Nom", uid: "name" },
  { name: "Prénom", uid: "surname" },
  { name: "Rôle", uid: "role" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const options: Options = {
  content: "client(s) trouvée(s)", //Affiche pour le nombre d'items et s'il n'y pas d'items trouvé
  search_name: "Chercher par client", //Titre de la barre de recherche
  search_uid: ["name", "surname", "role"], //uid des colonnes à filtrer
  selection_mode: "none", //"none", "single" ou "multiple"
  option_name: "Status",
  option_uid: "status",
  value_option: [
    { name: "Actif", uid: "Active" }, // uid need to be exactly the same as item's value. Name is the string to be printed
    { name: "Inactif", uid: "Inactive" },
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
      <Footer/>
    </NextUIProvider>
  );
}