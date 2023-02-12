import Coupon from "../models/couponSchema";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";

/*************************

* @CREATE_COUPON
* @route http://localhost:4000/api/coupon
* @description Controller used for creating a new coupon
* @description Only admin an Moderator can create the coupon
* @returns Coupon Object with success message "Coupon Created Successfully"

****************************/

export const createCoupon = asyncHandler( async (req, res) => {
    const {couponName, couponDiscount} = req.body;
    const coupon = await Coupon.createN({
        name: couponName,
        discount: couponDiscount
    })
    if(!coupon){
        throw new CustomError("Coupon not created", 400)
    }

    res.status(200).json({
        success: true,
        message: "Coupon Created Successfully",
        coupon
    })
})


/*************************

* @DEACTIVATE_COUPON
* @route http://localhost:4000/api/coupon/deactive/:couponId
* @description Controller used for deactivating the coupon
* @description Only admin an Moderator can update the coupon
* @returns Coupon Object with success message "Coupon Deactivated Successfully"

****************************/

export const deactivateCoupon = asyncHandler( async(req, res) => {
    const {coupondId} = req.params;
    const coupon = await Coupon.findByIdAndUpdate(
        {_id:coupondId},
        {active: false}
    )
    if(!coupon){
        throw new CustomError("Please try again with valid coupon", 400);
    }

    res.status(200).json({
        success: true,
        message: "Coupon Deactivated"
    })

})


/*************************

* @DELETE_COUPON
* @route http://localhost:4000/api/coupon/:couponId
* @description Controller used for deleting the coupon
* @description Only admin an Moderator can delete the coupon
* @returns Coupon Object with success message "Coupon Deleted Successfully"

****************************/

export const deleteCoupon = asyncHandler( async(req, res) => {
    const {couponId} = req.params;
    const coupon = await Coupon.findByIdAndDelete({_id:coupondId})
    if(!coupon){
        throw new CustomError("Please try again with valid coupon", 400);
    }

    res.status(200).json({
        success: true,
        message: "Coupon Deleted"
    })
})


/*************************

* @GET_ALL_COUPONS
* @route http://localhost:4000/api/coupon
* @description Controller used for getting all coupon details
* @description Only admin an Moderator can get all the coupons
* @returns allCoupons Object

****************************/

export const getAllCoupons = asyncHandler( async(req, res) => {
    const coupons = Coupon.find({})
    if(!coupons){
        throw new CustomError("No Coupons found", 400);
    }
    res.status(200).json({
        success:true,
        coupons
    })
})