import express from "express";
import {
    apiGetOrders,
    apiGetMyOrders,
    apiPlaceOrder,
    apiUpdateOrder,
    apiDeleteOrder,
} from "../controllers/orderController.js";

const apiOrderRouter = express.Router();

// GET all orders (Admin)
apiOrderRouter.get("/", apiGetOrders);

// GET order history for a specific user
apiOrderRouter.get("/user/:userId", apiGetMyOrders);

// POST place a new order
apiOrderRouter.post("/place", apiPlaceOrder);

// POST update order status
apiOrderRouter.post("/:id/update", apiUpdateOrder);

// DELETE an order
apiOrderRouter.delete("/:id", apiDeleteOrder);

export default apiOrderRouter;
