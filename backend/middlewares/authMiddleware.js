import User from "../models/userSchema.js"
import JWT from "jsonwebtoken"
import config from "../config/index.js"
import CustomError from "../utils/customError.js"
import asyncHandler from "../services/asyncHandler.js"

export const isLoggedIn = asyncHandler(async(req,res, next)=>{
    let token;

    if(
        req.cookies.token ||
        (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    ){
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if(!token){
        throw new CustomError("Not authorized to access this route", 401)
    }

    try {
        const decodedJwtPayLoad = JWT.verify(token, config.JWT_SECRET)
        // _id, find user based on id, set this in req.user
        req.user = await User.findById(decodedJwtPayLoad._id, "name email role")  // to get name email and role
        next()
    } catch (err) {
        throw new CustomError("Not authorized to access this route", 401)
    }
})

