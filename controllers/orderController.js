import orderModel from "../models/ordersModel.js";

// Render the orders list page
const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.render("orders/index", { orders });
    } catch (error) {
        console.error(error);
        res.status(500).render("orders/index", { orders: [], error: "Failed to load orders" });
    }
};

// Render the place order form
const placeOrderForm = async (req, res) => {
    res.render("orders/place");
};

// Handle placing a new order
const placeOrder = async (req, res) => {
    try {
        const { email, orderValue, items } = req.body;
        const itemsArray = items.split(",").map((item) => item.trim());
        await orderModel.create({ email, orderValue, items: itemsArray });
        res.redirect("/orders");
    } catch (error) {
        res.status(500).redirect("/orders/place");
    }
};

// Render the update order form
const updateOrderForm = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id).populate('userId', 'name email').populate('items.productId');
        res.render("orders/update", { order });
    } catch (error) {
        res.status(500).redirect("/orders");
    }
};

// Handle updating an order's status
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await orderModel.findByIdAndUpdate(id, { status });
        res.redirect("/orders");
    } catch (error) {
        res.status(500).redirect("/orders");
    }
};

// Handle deleting an order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await orderModel.findByIdAndDelete(id);
        res.redirect("/orders");
    } catch (error) {
        res.status(500).redirect("/orders");
    }
};

export { getOrders, placeOrderForm, placeOrder, updateOrderForm, updateOrder, deleteOrder };

// ===== JSON API endpoints for React frontend =====

// Get all orders as JSON (Admin view)
const apiGetOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to load orders" });
    }
};

// Get order history for a specific user
const apiGetMyOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await orderModel.find({ userId }).populate('items.productId').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to load order history" });
    }
};

// Place a new order via JSON
const apiPlaceOrder = async (req, res) => {
    try {
        const { userId, items, orderValue } = req.body;
        // items should be an array of { productId, name, price, quantity }
        const newOrder = await orderModel.create({ 
            userId, 
            items, 
            orderValue 
        });
        res.json({ message: "Order Placed", orderId: newOrder._id });
    } catch (error) {
        console.error("Order error:", error);
        res.status(500).json({ message: "Failed to place order" });
    }
};

// Update an order's status via JSON
const apiUpdateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await orderModel.findByIdAndUpdate(id, { status });
        res.json({ message: "Order Updated" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update order" });
    }
};

// Delete an order via JSON
const apiDeleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await orderModel.findByIdAndDelete(id);
        res.json({ message: "Order Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete order" });
    }
};

export { apiGetOrders, apiGetMyOrders, apiPlaceOrder, apiUpdateOrder, apiDeleteOrder };

