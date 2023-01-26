import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please provie a product name"],
            trim: true,
            maxLength: [120, "Product name should be a max of 120 characters"]
        },
        price:{
            type: Number,
            required: [true, "Please provie a product price"],
            maxLength: [5, "Product price should be a under 100000"]
        },
        description:{
            type: String,
            // use some form of editor - personal assignment
        },
        photos: [
            {
                secure_url: {
                    type: String,
                    required: true,
                }
            }
        ],
        stock: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        colldectionId: {
            // keeping reference of another schema
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Product',productSchema)