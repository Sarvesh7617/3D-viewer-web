import {app} from "./app.js";
import DBconnect from "./db/index.js";



DBconnect()
    .then(()=>{
        app.listen(process.env.PORT || 4000,()=>{
            console.log(`Server is running on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error)=>{
        console.log("DB connection failed: ",error)
    })