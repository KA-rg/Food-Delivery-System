import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//config variables
const currency = "jpy";
const deliveryCharge = 50;
const frontend_URL = 'http://localhost:5173';

// Placing User Order for Frontend using stripe
const placeOrder = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.body.userId, // from middleware
            items: req.body.items,   // from original req.
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price 
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: deliveryCharge
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`, //specific url later used for searchParams in verify.jsx
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
        });
        // Stripe returns a session object, and session.url is a special field that contains a prebuilt Stripe Checkout Page link.
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Placing User Order for Frontend using cod
const placeOrderCod = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}); //all users.
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Cleanup incomplete orders (orders with payment: false older than 2 hours)
const cleanupIncompleteOrders = async (userId) => {
    try {
        const time = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
        await orderModel.deleteMany({
            userId: userId,
            payment: false,
            date: { $lt: time }
        });
    } catch (error) {
        console.log("Cleanup error:", error);
    }
}

// User Orders for Frontend using API
const userOrders = async (req, res) => {
    try {
        // First cleanup any incomplete orders older than 2 hours
        await cleanupIncompleteOrders(req.body.userId);
        
        // Only return orders that are paid (payment: true)
        const orders = await orderModel.find({ 
            userId: req.body.userId
        });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => { //to set payment status to true
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

}

// Cleanup endpoint for incomplete orders
const cleanupOrders = async (req, res) => {
    try {
        await cleanupIncompleteOrders(req.body.userId);
        res.json({ success: true, message: "Cleanup completed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Cleanup failed" })
    }
}

export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, placeOrderCod, cleanupOrders }