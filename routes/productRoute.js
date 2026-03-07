import {showProducts} from "../controllers/productController";  
import express from 'express';

const productRouter = express.Router();
productRouter.get('/', showProducts);