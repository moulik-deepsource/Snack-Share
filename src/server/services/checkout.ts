import { Stripe } from 'stripe';

export const saveToCheckoutService = async (checkout: any) => {
    return await checkout.save();
};

export const createPaymentIntentService = async (stripe: Stripe, data: any) => {
    return await stripe.paymentIntents.create(data);
};
