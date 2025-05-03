import express from "express";
import cors from "cors";
import xssClean from "xss-clean";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { router as studentRouter } from "./routers/studentRoutes.js";
import { router as eventRouter } from "./routers/eventRoutes.js";
import { router as qrRouter } from "./routers/qrRoutes.js";
import Stripe from "stripe";
import bodyParser from "body-parser"; 





// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());

// Parse incoming requests with JSON payloads and set a size limit of 16KB
app.use(express.json({ limit: "16kb" }));

// Parse cookies from the request headers and make them accessible in req.cookies
app.use(cookieParser());

// Use Helmet middleware for basic security headers
app.use(helmet());

// XSS protection middleware
app.use(xssClean());





// Stripe Checkout Session
app.post("/api/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    console.log(products);
    

    try {
        const lineItems = products.map((product) => ({
        
            
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.title,
                },
                unit_amount:parseInt(
                    product.price.toString().replace(/[₹,]/g, "")
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

        console.log(lineItems);
        

      
        const stripeCustomer = await stripe.customers.create({
            name: customerData.name,
            address: customerData.address,
        });

        console.log(stripeCustomer);
        

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            customer: stripeCustomer.id,
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });

        
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Stripe Webhook
const endpointSecret = process.env.END_POINT;

app.post("/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;
            await Order.findOneAndUpdate(
                { customerId: session.customer },
                { status: "completed" }
            );
            break;

        case "payment_intent.payment_failed":
            const paymentIntent = event.data.object;
            const customerId = paymentIntent.customer;
            await Order.findOneAndUpdate(
                { customerId },
                { status: "failed" }
            );
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});






// Routes
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/qr", qrRouter);


export { app };
