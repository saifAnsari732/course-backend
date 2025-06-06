import express from 'express';
import { login, logout, purchases, signup } from '../Controller/User.controler.js';
import usermiddlewere from '../Middlewere/User.mid.js';
const router = express.Router();

// || route neviget the other page or route
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/purchases",usermiddlewere, purchases);




export default router;