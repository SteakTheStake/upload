import HttpError from '@wasp/core/HttpError.js'

export const createItem = async (args, context) => {
  const newItem = await context.entities.Item.create({
    data: {
      title: args.title,
      description: args.description,
      price: args.price
    }
  });

  return newItem;
}

export const createSubscription = async (args, context) => {
  const { name, price } = args;

  if (!context.user) { throw new HttpError(401) };

  return context.entities.Subscription.create({
    data: {
      name,
      price,
      userId: context.user.id
    }
  });
}

export const addToCart = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: args.userId }
  });
  if (!user) { throw new HttpError(404) };

  const item = await context.entities.Item.findUnique({
    where: { id: args.itemId }
  });
  if (!item) { throw new HttpError(404) };

  return context.entities.User.update({
    where: { id: args.userId },
    data: {
      cart: {
        create: [{ itemId: args.itemId }]
      }
    }
  });
}

export const subscribe = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: args.userId }
  });
  if (!user) { throw new HttpError(404) };

  const subscription = await context.entities.Subscription.findUnique({
    where: { id: args.subscriptionId }
  });
  if (!subscription) { throw new HttpError(404) };

  return context.entities.User.update({
    where: { id: args.userId },
    data: {
      subscriptions: { connect: { id: args.subscriptionId } }
    }
  });
}