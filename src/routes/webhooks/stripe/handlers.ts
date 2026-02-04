import type Stripe from 'stripe';

const mapStripeProductToDbProduct = ({ id }: Stripe.Product) => {};

export const upsertProduct = async (product: Stripe.Product) => {};

const mapStripePriceToDbPrice = ({ id }: Stripe.Product) => {};

export const upsertPrice = async (price: Stripe.Price) => {};
