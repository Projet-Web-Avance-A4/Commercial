import React, { useState } from 'react';

type CounterProps = {
  totalOrderPrice: number;
};

const Counter: React.FC<CounterProps> = ({ totalOrderPrice }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-blue-500 rounded-lg shadow-md w-auto mx-2 my-2">
      <h1 className="text-2xl font-bold mb-4">Chiffre d'affaires transactionnel global en cours</h1>
      <div className="text-3xl font-bold mb-4">{totalOrderPrice} € </div>
    </div>
  );
};


export default Counter;
