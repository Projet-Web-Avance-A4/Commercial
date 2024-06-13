
"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header/header";
import Table from "../components/table/table";
import Counter from '../components/counter/counter';
import Footer from "../components/footer/footer";
import { useState, useEffect } from 'react';
import { Order } from '../types/order';
import { Options } from "../interfaces/table";
import { propsTable } from "@/app/interfaces/table";
import deleteUserButton from "../components/actionButtonTable/deleteUserButton"
import editUserButton from "../components/actionButtonTable/editUserButton"
import switchUserState from "../components/actionButtonTable/switchStateButton"

export default function Home() {


  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/order/getOrders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log(data)
        setOrdersList(data);
        }

        catch(err) {
          console.error(err);
        };
      }
        fetchOrders();
    }, []);

    // Calculer la somme des prix des commandes sauf celles en statut "delivered"
  const totalOrderPrice = ordersList.reduce((total, order) => {
    if (order.order_status !== "delivered") {
      total += order.price;
    }
    return total;
  }, 0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const INITIAL_VISIBLE_COLUMNS = [
    "adresse_resto",
    "adresse_client",
    "payment_method",
    "actions",//Always here
  ];
  
  const items = ordersList.map((order) => (
    {
      id: order.order_id,//We always need an unique id, but it is never shown. Make sure to used an unique key as value.
      adresse_resto: order.restaurant.address.street + ', ' + order.restaurant.address.city,
      ville_resto: order.restaurant.address.city,
      adresse_client: order.customer.address.street + ', ' + order.customer.address.city,
      ville_client: order.customer.address.city,
      payment_method: order.payment.method=='credit_card'?'Carte de crédit':'Liquide',
    }
  ));
  
  const columns = [
    { name: "Adresse du restaurateur", uid: "adresse_resto" },
    { name: "Ville du restaurateur", uid: "ville_resto" },
    { name: "Adresse du client", uid: "adresse_client" },
    { name: "Ville du client", uid: "ville_client" },
    { name: "Moyen de paiement", uid: "payment_method" },
    { name: "Actions", uid: "actions" },//Always here
  ];
  
  const options: Options = {
    content: "commande(s) trouvée(s)", //Used for the number of items and when no items was found
    search_name: "Chercher par ville", //Title of the search bar
    search_uid: ["ville_resto", "ville_client"], //ALWAYS AN ARRAY, uid of the column to filter 
    selection_mode: "none", //"none", "single" or "multiple"
    option_name: "Moyen de paiement", //Name of the option filter
    option_uid: "payment_method", //ALWAYS A SINGLE STRING, uid of the column filtered with the option
    value_option: [
      { name: "Carte de crédit", uid: "Carte de crédit" }, // uid need to be exactly the same as item's value. Name is the string to be printed
      { name: "Liquide", uid: "Liquide" },
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
      <Header title="Service Commercial" showMyAccount={false} showStats={false}/>
      <div className="flex-grow my-5">
        <Counter totalOrderPrice={totalOrderPrice}/>
        <Table
        props={props}
        actionButtons={[switchUserState, editUserButton, deleteUserButton]}
            />
      </div>
      <Footer/>
    </NextUIProvider>
  );
}
