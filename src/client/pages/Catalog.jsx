import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getItem from '@wasp/queries/getItem';

export function Catalog() {
  const { data: item, isLoading, error } = useQuery(getItem, { id: 1 });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Catalog</h1>
      <div className='my-4'>
        <h2 className='text-xl font-bold'>{item.title}</h2>
        <p>{item.description}</p>
        <p>${item.price}</p>
        <Link to='/cart' className='bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white font-bold rounded mt-4'>Add to Cart</Link>
      </div>
    </div>
  );
}