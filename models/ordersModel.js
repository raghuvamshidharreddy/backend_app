import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true 
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 }
        }
    ],
    orderValue: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;