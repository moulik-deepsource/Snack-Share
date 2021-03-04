import { Request, Response } from 'express';
// import Stripe from 'stripe';
import { v4 as uuid } from 'uuid';
import stripe from 'config/stripe';

// import checkoutModel from '../models/Checkout';
// import { createPaymentIntentService, saveToCheckoutService } from '../services/checkout';

// interface PaymentBody {
//     amount: number;
//     currency: string;
//     student: any;
//     course: any;
//     email: string;
// }

// export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
//     const { currency, amount, student, course, email }: PaymentBody = req.body;
//     const params: Stripe.PaymentIntentCreateParams = {
//         amount: amount,
//         currency: 'usd',
//         receipt_email: email,
//     };
//     const dataStripe = await createPaymentIntentService(stripe, params);
//     const model = new checkoutModel({
//         student: student,
//         course: course,
//         email: email,
//         stripe: dataStripe,
//     });
//     saveToCheckoutService(model)
//         .then((doc) => {
//             if (!doc || doc.length === 0) {
//                 return res.status(500).send(doc);
//             }
//             res.status(200).send(doc);
//         })
//         .catch((err) => {
//             res.status(500).json(err);
//         });
// };

export const checkoutCourse = async (req: Request, res: Response) => {
    let status;
    let error;
    try {
        const { product, token } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const idempotencyKey = uuid();
        const charge = await stripe.charges.create(
            {
                amount: product.price * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the ${product.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip,
                    },
                },
            },
            {
                idempotencyKey,
            }
        );

        console.log('Charge: ', { charge });
        status = 'success';
    } catch (error) {
        console.log('Error: ', error);
        status = 'false';
    }

    res.json({ error, status });
};
