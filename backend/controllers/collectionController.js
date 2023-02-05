import Collection from '../models/collectionSchema'
import asyncHandler from '../services/asyncHandler'
import CustomError from '../utils/customError'


/*************************

* @Create_COLLECTION
* @route http://localhost:4000/api/collection
* @description User signup controller for creating a new user
* @parameters
* @returns User Object

****************************/

export const createCollection = asyncHandler( async(req, res)=>{
    // take name from frontend
    const { name } = req.body;
    if(!name){
        throw new CustomError('Collection name is required',400)
    }

    // add this name to DB
    const collection = await Collection.create({
        name
    })

    //send this response value to frontend
    res.status(200).json({
        success: true,
        message: "Collection created successfully",
        collection
    })

})

export const updateCollection = asyncHandler( async(req, res) => {
    // get existing value to be updated
    const {id: collectionId} = req.params
    //new value to get updated
    const {name} = req.body;

    if(!name) {
        throw new CustomError("Collection name is required", 400);
    }

    let updatedCollection = await Collection.findByIdAndUpdate(
        collectionId,
        { 
            // what to update
            name
        },
        {
            // explicitly mentioning to give the new updated value
            new: true,
            runValidators: true,
        }
    )
    if(!updatedCollection){
        throw new CustomError("Collection not found", 400)
    }

    // send response to frontend
    res.status(200).json({
        success: true,
        message: "Collection updated successfully",
        updatedCollection
    })

})

export const deleteCollection = asyncHandler( async(req,res) => {
    const {id: collectionId} = req.params;
    const collectionToDelete = await Collection.findByIdAndDelete(collectionId)

    if(!collectionToDelete){
        throw new CustomError("Collection not found", 400)
    }

    collectionToDelete.remove() // to free the memory

    // send response to frontend
    res.status(200).json({
        success: true,
        message: "Collection deleted successfully",
        // collectionToDelete
    })
})

export const getAllCollections = asyncHandler( async(req, res) => {
    const collections = await Collection.find();

    if(!collections){
        throw new CustomError("No Collections found", 400)
    }    

    res.status(200).json({
        success: true,
        collections
    })
})