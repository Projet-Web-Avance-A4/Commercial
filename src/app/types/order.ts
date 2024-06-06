export type Address = {
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };
  
  export type Customer = {
    customer_id: number;
    name: string;
    phone: string;
    email: string;
    address: Address;
  };
  
  export type Restaurant = {
    restaurant_id: number;
    name: string;
    phone: string;
    address: Address;
  };
  
  export type Item = {
    menu_id?: number;
    drink_id?: number;
    dessert_id?: number;
    name: string;
    price: number;
  };
  
  export type Payment = {
    method: string;
    transaction_id: string;
    amount: number;
    currency: string;
    time_payment: Date;
  };
  
  export type Driver = {
    driver_id: number;
    name: string;
    phone: string;
  };
  
  export type Order = {
    order_id: number;
    customer: Customer;
    restaurant: Restaurant;
    items: Item[];
    order_status: string;
    verification_code: string;
    estimated_delivery_time: Date;
    payment: Payment;
    driver: Driver;
    price: number;
  };
  