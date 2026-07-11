import multer from "multer";


const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "src/modelupload");

    },


    filename: function (req, file, cb) {

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});



const fileFilter = (req, file, cb) => {


    console.log("FILE NAME:", file.originalname);
    console.log("MIME TYPE:", file.mimetype);



    const extension = file.originalname
        .split(".")
        .pop()
        .toLowerCase();



    if(extension === "glb")
        cb(null, true);

    else

        cb(
            new Error("Only GLB files are allowed"),
            false
        );

};



const upload = multer({

    storage,
    fileFilter

});


export { upload };