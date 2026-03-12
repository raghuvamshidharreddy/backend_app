import {
    getOrders,
    placeOrderForm,
    placeOrder,
    updateOrderForm,
    updateOrder,
    deleteOrder,
} from "../controllers/orderController.js";
import express from "express";
const orderRouter = express.Router();

orderRouter.get("/", getOrders);
orderRouter.get("/place", placeOrderForm);
orderRouter.post("/place", placeOrder);
orderRouter.get("/:id/update", updateOrderForm);
orderRouter.post("/:id/update", updateOrder);
orderRouter.get("/:id/delete", deleteOrder);

export default orderRouter;