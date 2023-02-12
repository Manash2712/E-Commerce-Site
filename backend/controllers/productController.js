import Product from "../models/productSchema.js"
import formidable from 'formidable'
import fs from 'fs'  // file system module
import {s3FileUpload, s3FileDelete} from "../services/imageUpload.js"
import asyncHandler from '../services/asyncHandler'
import CustomError from '../utils/customError'
import Mongoose from "mongoose"
import config from "../config/index.js"


/*************************

* @ADD_PRODUCT
* @route http://localhost:4000/api/product
* @description Controller used for creating a new product
* @description Only admin can create the coupon
* @description Uses AWS S3 Bucket for image upload
* @returns Product Object

****************************/

export const addProduct = asyncHandler(async (req, res) => {
    const form = formidable({
        multiples: true, //upload multiple file
        keepExtensions: true,
    });

    form.parse(req, async function (err, fields, files){
        try {
            if (err){
                throw new CustomError(err.message || "Something went wrong", 500)
            }
            // generate a custom Id and save it in DB. for storing product images along with id or we can directly store the image
            let productid = new Mongoose.Types.ObjectId().toHexString() //hexstring for a extra check
            // console.log(fields, files);

            // check for fileds
            if( !fields.name ||
                !files.price ||
                !fields.description ||
                !fields.collectionId
            ){
                throw new CustomError("Please fill all the details", 500)
            }

            // handling images

            // promise.all wraps all promises and when all promises are done working then it gives final response that all promises are done working
            // we are using it because we have enabled option for multiple file upload
            let imgArrayResp = Promise.all(
                // it will return array of keys
                Object.keys(files).map(async (filekey, index) => {
                    // this element is a big object with file properties like path exension n all
                    const element = files[filekey]

                    const data = fs.readFileSync(element.filepath)

                    const upload = await s3FileUpload({
                        bucketName: config.S3_BUCKET_NAME,
                        key: `products/${productid}/photo_${index+1}.png`,
                        body: data,
                        contentType: element.mimetype  // to get file type
                    })
                    return {
                        secure_url: upload.Location
                    }
                })
            )

            let imgArray = await imgArrayResp;

            const product = await Product.create({
                _id: productid,
                photos: imgArray,
                ...fields,
            })

            if(!product){
                throw new CustomError("Product was not created",400)
            }
            res.status(200).json({
                success:true,
                product
            })

        } catch (error) {
            return res.status(500).json({
                success:false,
                message: error.message || "Something went wrong"
            })
        }
    })
})


/*************************

* @GET_ALL_PRODUCT
* @route http://localhost:4000/api/product
* @description Controller used for getting all products details
* @description User and admin can get all the products
* @returns Product Object

****************************/

export const getAllProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({})

    if(!products){
        throw new CustomError("No product was found", 404)
    }

    res.status(200).json({
        success: true,
        products
    })
})


/*************************

* @GET_PRODUCT_BY_ID
* @route http://localhost:4000/api/product
* @description Controller used for getting a single product details
* @description User and admin can get single product details
* @returns Product Object

****************************/

export const getProductById = asyncHandler( async (req, res) => {
    const {id: productId} = req.params
    const product = await Product.findById(productId)

    if(!product){
        throw new CustomError("Product not found", 404)
    }

    res.status(200).json({
        success: true,
        product
    })
})


//assignment to read 

/*
model.aggregate([{}, {}, {}])

$group
$push
$$ROOT
$lookup
$project

*/