import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getSubscription from '@wasp/queries/getSubscription';
import addToCart from '@wasp/actions/addToCart';

export function HomePage() {
  const { data: subscription, isLoading, error } = useQuery(getSubscription);
  const addToCartFn = useAction(addToCart);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddToCart = () => {
    addToCartFn({ subscriptionId: subscription.id });
  };

  return (
    <div className='bg-blue-900 text-white h-screen flex items-center justify-center'>
      <h1 className='text-4xl font-bold'>Welcome to Summit</h1>
      <p className='mt-4'>Subscribe to Summit Plus for ${subscription.price} per month</p>
      <button
        onClick={handleAddToCart}
        className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Add to Cart
      </button>
      <Link
        to='/catalog'
        className='text-blue-300 hover:text-blue-500 font-bold mt-2'
      >
        View Catalog
      </Link>
    </div>
  );
}