const data = [{
  "order_id": 1,
  "customer": {
    "customer_id": 1,
    "name": "Smail Benali",
    "phone": "+33123456789",
    "email": "smail.benali@viacesi.fr",
    "address": {
      "street": "10 rue de CESI",
      "city": "Lille",
      "postal_code": "59800",
      "country": "France"
    }
  },
  "restaurant": {
    "restaurant_id": 1,
    "name": "Au Bon Réseau",
    "phone": "+33198765432",
    "address": {
      "street": "12 rue de CESI",
      "city": "Lille",
      "postal_code": "59800",
      "country": "France"
    }
  },
  "items": [
    {
      "menu_id": 10,
      "name": "Bus chez SFR",
      "price": 12.50
    },
    {
      "drink_id": 11,
      "name": "Café",
      "price": 2.00
    },
    {
      "dessert_id": 12,
      "name": "Définition du temps",
      "price": 2.50
    }
  ],
  "total_price": 17.00,
  "order_status": "in_progress",
  "verification_code": "123456",
  "estimated_delivery_time": "2024-05-23T19:45:00Z",
  "payment": {
    "method": "credit_card",
    "transaction_id": "tx_1234567890",
    "amount": 17.00,
    "currency": "EUR",
    "payment_time": "2024-05-23T19:10:00Z"
  },
  "driver": {
    "driver_id": 14,
    "name": "Hugo Corso",
    "phone": "+33111223344",
    "vehicle": "Voiture"
  }
}]

export {data};