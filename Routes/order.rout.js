import express from "express";
import { orderData } from "../Controller/order.controller.js";
import userMiddleware from "../Middlewere/User.mid.js";

const router = express.Router();

router.post("/", userMiddleware, orderData);

export default router;
