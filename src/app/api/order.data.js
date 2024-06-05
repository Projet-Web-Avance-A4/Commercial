import React from "react";

/* EXEMPLE DE DONNEES PROVENANT DE LA BDD VIA L'API */
const columns = [
  {name: "ID", uid: "idOrder", sortable: true},
  {name: "COMMANDE", uid: "codeOrder", sortable: true},
  {name: "PRIX", uid: "priceOrder", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
];

const statusOptions = [
  {name: "Enregistré", uid: "Registered"},
  {name: "En préparation", uid: "InPreparation"},
  {name: "En cours de livraison", uid: "InDelivery"},
  {name: "Livré", uid: "Completed"},
];

const orders = [
    {
      "idOrder": 1,
      "codeOrder": "ORD001",
      "priceOrder": 150.0,
      "status": "Registered",
    },
    {
      "idOrder": 2,
      "codeOrder": "ORD002",
      "priceOrder": 250.5,
      "status": "Completed",
    },
    {
      "idOrder": 3,
      "codeOrder": "ORD003",
      "priceOrder": 100.75,
      "status": "InPreparation",
    },
    {
      "idOrder": 4,
      "codeOrder": "ORD004",
      "priceOrder": 325.0,
      "status": "InDelivery",
    },
    {
      "idOrder": 5,
      "codeOrder": "ORD005",
      "priceOrder": 180.99,
      "status": "Registered",
    },
    {
      "idOrder": 6,
      "codeOrder": "ORD006",
      "priceOrder": 225.3,
      "status": "Completed",
    },
    {
      "idOrder": 7,
      "codeOrder": "ORD007",
      "priceOrder": 90.0,
      "status": "InPreparation",
    },
    {
      "idOrder": 8,
      "codeOrder": "ORD008",
      "priceOrder": 400.0,
      "status": "InDelivery",
    },
    {
      "idOrder": 9,
      "codeOrder": "ORD009",
      "priceOrder": 350.25,
      "status": "Registered",
    },
    {
      "idOrder": 10,
      "codeOrder": "ORD010",
      "priceOrder": 275.0,
      "status": "Completed",
    }
  ];

export {columns, orders, statusOptions};
