import HttpError from '@wasp/core/HttpError.js'

export const getItem = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const item = await context.entities.Item.findUnique({
    where: { id },
  });

  if (!item) throw new HttpError(404, 'No item with id ' + id);

  return item;
}

export const getSubscription = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const subscription = await context.entities.Subscription.findUnique({
    where: { id }
  });

  if (!subscription) throw new HttpError(404, 'No subscription with id ' + id);

  return subscription;
}

export const getUserCart = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const cart = await context.entities.User.findUnique({
    where: { id: userId },
    include: { cart: true }
  });

  if (!cart) { throw new HttpError(404, `Cart not found for user with id ${userId}`) }

  return cart.cart;
}

export const getUserSubscriptions = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const subscriptions = await context.entities.Subscription.findMany({
    where: {
      users: { id: userId }
    }
  });

  return subscriptions;
}