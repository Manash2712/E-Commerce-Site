import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        products:{
            type:[
                {
                    productId : {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product"
                    },
                    count: Number,
                    price: Number
                }
            ],
            required: true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        coupon: String,
        transactionId: String,
        status: {
            type: String,
            enum: ["ORDERED", "SHIPPED", "DELIVERED", "CANCELLED"],
            default: "ORDERED"
            // improve this refer utils (authRoles)
        }
        // paymentMode: UPI, creditcard, wallet or COD
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Order", orderSchema)