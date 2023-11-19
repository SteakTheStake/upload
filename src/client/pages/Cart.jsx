import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserCart from '@wasp/queries/getUserCart';

export function Cart() {
  const { data: cart, isLoading, error } = useQuery(getUserCart);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Shopping Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{item.title}</div>
          <div>${item.price}</div>
        </div>
      ))}

      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Purchase</button>
      <Link to='/catalog' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2'>Back to Catalog</Link>
    </div>
  );
}