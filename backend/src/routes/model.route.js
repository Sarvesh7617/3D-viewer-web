import { Router } from "express";
import { deleteModel, getAllModels, updateModel, uploadModel } from "../controllers/model.controller.js";
import {upload} from "../middlewares/upload.js";


const router = Router();


router.route("/upload").post(upload.single("model"),uploadModel);


router.route("/get-models").get(getAllModels);


router.route("/models/:id").put(updateModel).delete(deleteModel);


export default router;