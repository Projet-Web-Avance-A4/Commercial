"use client";

import { NextUIProvider } from "@nextui-org/system";
import Table from "../components/table/table";
import Counter from '../components/counter/counter';
import Footer from "../components/footer/footer";
import NotificationNewUser from '../components/newUser/newUser';
import { useState, useEffect } from 'react';
import { Order } from '../types/order';
import { Options } from "../interfaces/table";
import { propsTable } from "@/app/interfaces/table";
import { useHeader } from '../hooks/useHeader';
import { useRouter } from 'next/navigation';
import { decodeAccessToken} from './utils';

export default function Home() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser, setShowMyAccount, setShowStats, setShowSponsor } = useHeader();
  const router = useRouter();
  
  
  useEffect(() => {
    const setInHeader = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error("Token non trouvé");
        }
  
        const userData = await decodeAccessToken(accessToken);
        setUser(userData);
  
        if (userData) {
          setShowMyAccount(true);
          setShowStats(true);
          setShowSponsor(true);
        } else {
          throw new Error("Utilisateur non connecté");
        }
      } catch (error) {
        router.push('/');
      }
    };
  
    setInHeader();
  }, []);

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
    { name: "Client", uid: "customer_name", sortable: true },
    { name: "Commande", uid: "order", sortable: true },
    { name: "Restaurant", uid: "restaurant_name", sortable: true },
    { name: "Livreur", uid: "driver_name", sortable: true },
    { name: "Ville", uid: "city", sortable: true },
    { name: "Prix", uid: "price", sortable: true },
    { name: "Status", uid: "order_status", sortable: true }, 
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
      <NotificationNewUser />
    </NextUIProvider>
  );
}
