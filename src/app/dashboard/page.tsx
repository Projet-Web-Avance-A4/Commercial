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
import deleteUserButton from "../components/actionButtonTable/deleteUserButton";
import editUserButton from "../components/actionButtonTable/editUserButton";
import switchUserState from "../components/actionButtonTable/switchStateButton";

export default function Home() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/order/getOrders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        console.log(data);
        const filteredOrders = data.filter((order: Order) => order.order_status !== "done");
        setOrdersList(filteredOrders);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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
    "customer_name",
    "order",
    "restaurant_name",
    "driver_name",
    "city",
    "price",
    "order_status",
  ];

  const items = ordersList.map((order) => ({
    id: order.order_id, 
    customer_name: order.customer.name,
    order: order.items.map(item => `${item.name}`).join(', '),
    restaurant_name: order.restaurant.name,
    driver_name: order.driver.name,
    city: order.customer.address.city,
    price: order.price,
    order_status: order.order_status,
  }));

  const columns = [
    { name: "Client", uid: "customer_name" },
    { name: "Commande", uid: "order" },
    { name: "Restaurant", uid: "restaurant_name" },
    { name: "Livreur", uid: "driver_name" },
    { name: "Ville", uid: "city" },
    { name: "Prix", uid: "price" },
    { name: "Status", uid: "order_status" }, 
  ];

  const options: Options = {
    content: "commande(s) trouvée(s)", 
    search_name: "Chercher par client, restaurant, ville", 
    search_uid: ["customer_name","restaurant_name", "city"], 
    selection_mode: "none", 
    option_name: "Status de la commande", 
    option_uid: "order_status", 
    value_option: [
      { name: "Reçue", uid: "checked" }, 
      { name: "En préparation", uid: "in_progress" },
      { name: "En livraison", uid: "in_delivery" },
    ],
  };

  const props: propsTable = {
    columns: columns,
    options: options,
    items: items,
    INITIAL_VISIBLE_COLUMNS: INITIAL_VISIBLE_COLUMNS,
  };

  return (
    <NextUIProvider className="flex flex-col min-h-screen bg-beige">
      <div className="flex-grow my-5">
        <Counter totalOrderPrice={totalOrderPrice} />
        <Table
          props={props}
          actionButtons={[]}
        />
      </div>
    </NextUIProvider>
  );
}
