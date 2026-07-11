import mongoose from "mongoose";

const modelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    filePath: {
      type: String,
      required: true
    }
  },{timestamps: true});


const Model = mongoose.model("Model", modelSchema);

export default Model;