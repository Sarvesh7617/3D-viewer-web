import Model from "../models/glbmodel.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import fs from "fs";
import path from "path";

const uploadModel = asyncHandler(async (req, res) => {

    try {

        const { title } = req.body;

        const newModel = await Model.create({

            title: title,

            filePath: req.file.filename

        });


        res.status(201).json(
            new ApiResponse(
                201,
                "Model uploaded successfully",
                {model: newModel}
            )
    );


    } 
    catch (error) {

        console.error("File upload controller error:", error);

        if (error instanceof ApiError)
            throw error;


        throw new ApiError(
            500,
            error.message || "Internal Server Error"
        );

    }

});



const getAllModels = asyncHandler(async (req, res) => {

    try {

        const models = await Model.find().sort({
            createdAt: -1
        });


        return res.status(200).json(

            new ApiResponse(
                200,
                { models },
                "Models fetched successfully"
            )

        );


    } 
    catch (error) {

        console.error("Get models controller error:", error);


        if(error instanceof ApiError)
            throw error;


        throw new ApiError(
            500,
            error.message || "Internal Server Error"
        );

    }

});


const deleteModel = asyncHandler(async (req, res) => {

    try {

        const { id } = req.params;


        const model = await Model.findById(id);


        if (!model)

            throw new ApiError(
                404,
                "Model not found"
            );


        // Delete file from uploads folder
        if (model.filePath)

            fs.unlinkSync(
                path.resolve(model.filePath)
            );



        await Model.findByIdAndDelete(id);


        return res.status(200).json(

            new ApiResponse(
                200,
                {},
                "Model deleted successfully"
            )

        );


    } 
    catch (error) {

        console.error("Delete model controller error:", error);


        if(error instanceof ApiError)
            throw error;


        throw new ApiError(
            500,
            error.message || "Internal Server Error"
        );

    }

});



const updateModel = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
    
        if (!title || !title.trim())
            throw new ApiError(400, "Title is required");
    
        const model = await Model.findById(id);
    
        if (!model)
            throw new ApiError(404, "Model not found");
    
        model.title = title.trim();
    
        await model.save();
    
        return res.status(200).json(
            new ApiResponse(
                200,
                { model },
                "Model updated successfully"
            )
        );
    } 
    catch (error) {

        console.error("Update model controller error:", error);


        if(error instanceof ApiError)
            throw error;


        throw new ApiError(
            500,
            error.message || "Internal Server Error"
        );
    }
});

export {uploadModel,getAllModels,deleteModel,updateModel};