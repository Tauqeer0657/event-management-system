import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from "stripe";
import bodyParser from "body-parser"; 

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Api to add Event
const createSession = asyncHandler(async (req, res) => {
    const { products } = req.body;

        const lineItems = products.map((product) => ({
            
            price_data: {
                currency: "SAR",
                product_data: {
                    name: product.title,
                },
                unit_amount:parseInt(
                    product.price.toString().replace(/[SAR,]/g, "")
                ) * 100, 
            },
            quantity: product.qnty,
        }));

        const customerData = {
            name: "John Doe",
            address: {
                line1: "123 Street Name",
                postal_code: "123456",
                city: "City Name",
                state: "State Name",
                country: "IN",
            },
        };

        const stripeCustomer = await stripe.customers.create({
            name: customerData.name,
            address: customerData.address,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            customer: stripeCustomer.id,
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.status(201).json({ id: session.id });

});

export { createSession };
