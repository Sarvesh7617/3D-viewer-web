import express from "express";
import cors from "cors";



const app=express();



app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json());

app.use("/modelupload",express.static("src/modelupload"));


import uploadRoute from "./routes/model.route.js";


app.use("/api/v1",uploadRoute);


export {app};