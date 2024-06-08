
"use client";

import { NextUIProvider } from "@nextui-org/system";
import Header from "../components/header";
import OrderTable from "../components/ordertable";
import Counter from '../components/counter';
import Footer from "../components/footer";
import CustomCard from "../components/customcard";
import PortalCard from "../components/portalCard";
import Notification from "../components/notification";
import { useState, useEffect } from 'react';
import { FaUserLarge , FaChartColumn } from 'react-icons/fa6';
import { Order } from '../types/order';

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

  return (
    <NextUIProvider className=" flex flex-col min-h-screen bg-beige">
      <Header title="Service Commercial" showMyAccount={false} showStats={false}/>
      <div className="flex-grow my-5">
        <Counter totalOrderPrice={totalOrderPrice}/>
        <OrderTable showAction={false} showStatusAction={true} showCreateAction={false} showEditAction={false} showDeleteAction={false}/>
      </div>
      <Footer/>
    </NextUIProvider>
  );
}
