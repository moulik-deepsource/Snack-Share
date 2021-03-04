import { Request, Response } from 'express';
import stripe from 'config/stripe';

export const createCheckout = async (req: Request, res: Response) => {
    await stripe.checkout.sessions
        .create({
            payment_method_types: ['card'],
            submit_type: 'pay',
            customer_email: 'quoctrung163@icloud.com',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Stubborn Attachments',
                            images: ['https://i.imgur.com/EHyR2nP.png'],
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:8500/checkout?success=true',
            cancel_url: 'http://localhost:8500/checkout?canceled=true',
        })
        .then((data) => {
            // stripe.paymentIntents.create({
            //     amount: 1099,
            //     currency: 'usd',
            //     payment_method_types: ['card'],
            //     receipt_email: 'quoctrung163@icloud.com',
            // });
            res.json({ id: data.id });
        })
        .catch((err) => res.status(500).send(err));
    // res.json({ id: session.id });
};
