import Product from "../models/productSchema"
import Coupon from "../models/couponSchema"
import Order from "../models/orderSchema"
import asyncHandler from "../services/asyncHandler"
import CustomError from "../utils/customError"
import razorpay from "../config/razorpayConfig"


/*************************

* @GENERATE_RAZORPAY_ID
* @route http://localhost:4000/api/order/razorpay
* @description Controller used for generating razorpay Id
* @description Creates a Razorpay Id which is used for placing order
* @returns Order Object with "Razorpay order id generated successfully"

****************************/

export const generateRazorpayOrderId = asyncHandler( async(req, res) => {
    // get product and coupon from frontend

    // verify product price from backend
    // make DB query to get all products and info

    let totalAmount;
    // total amount and final amount
    // coupon check from DB
    // discount
    // finalAmount = totalAmount - discount

    const options = {
        amount: Math.round(totalAmount * 100), // multiplyin by 100 because it stores every currency in smallest portion paise in INR
        currency: "INR",
        receipt: `receipt_${new Date().getTime()}`,
    }

    const order = await razorpay.orders.create(options)

    // if order does not exist
    // success then, send it to front end
})
