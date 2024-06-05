import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-blue-500 rounded-lg shadow-md w-auto mx-2 my-2">
      <h1 className="text-2xl font-bold mb-4">Chiffre d'affaires transactionnel global en cours</h1>
      <div className="text-3xl font-bold mb-4">{count} € </div>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
