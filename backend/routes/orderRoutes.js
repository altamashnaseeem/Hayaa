import express from "express"
import adminAuth from "../middleware/adminAuth.js"
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateOrderStatus, userOrders, verifyRazorpay, verifyStripe } from "../controllers/orderController.js";
import {authUser} from "../middleware/auth.js"
const orderRouter=express.Router();
//admin features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateOrderStatus)
//payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
//user feature
orderRouter.post('/userorders',authUser,userOrders);
//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)



export default orderRouter;
