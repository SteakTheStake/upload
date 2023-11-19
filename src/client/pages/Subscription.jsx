import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getSubscription from '@wasp/queries/getSubscription';
import subscribe from '@wasp/actions/subscribe';

export function SubscriptionPage() {
  const { data: subscription, isLoading, error } = useQuery(getSubscription);
  const subscribeFn = useAction(subscribe);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleSubscribe = () => {
    subscribeFn({ subscriptionId: subscription.id });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Subscription Options</h1>
      <div className='bg-white p-4 rounded-lg'>
        <p className='text-lg mb-2'>Name: {subscription.name}</p>
        <p className='text-lg mb-2'>Price: ${subscription.price}</p>
        <button
          onClick={handleSubscribe}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Subscribe
        </button>
        <Link to='/catalog' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2'>
          Back to Catalog
        </Link>
      </div>
    </div>
  );
}