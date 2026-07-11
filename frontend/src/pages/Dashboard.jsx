import { useEffect, useState } from "react";
import axiosInstance from "../helper/axiosHelper";


const Dashboard = () => {

    const [models, setModels] = useState([]);

    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");



    // GET MODELS

    const fetchModels = async () => {

        try {

            const response = await axiosInstance.get("/get-models");

            setModels(
                response.data.data.models
            );

        } catch (error) {

            console.log(error);

        }

    };



    useEffect(()=>{

        fetchModels();

    },[]);




    // UPLOAD

    const handleUpload = async(e)=>{

        e.preventDefault();


        try{

            const formData = new FormData();

            formData.append(
                "title",
                title
            );

            formData.append(
                "model",
                file
            );


            await axiosInstance.post("/upload",formData,
                {
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }
            );


            setTitle("");
            setFile(null);


            fetchModels();


        }catch(error){

            console.log(error);

        }

    };




    // DELETE

    const handleDelete = async(id)=>{

        try{

            await axiosInstance.delete(`/models/${id}`);


            fetchModels();


        }
        catch(error){

            console.log(error);

        }

    };




    // UPDATE TITLE

    const handleUpdate = async(id)=>{

        try{

            await axiosInstance.put(`/models/${id}`,
                {
                    title: editTitle
                }
            );


            setEditId(null);
            setEditTitle("");


            fetchModels();


        }catch(error){

            console.log(error);

        }

    };



    return (

        <div className="min-h-[calc(100vh-70px)] bg-gray-100 p-6">


            <div className="rounded-xl bg-white p-6 shadow">


                <h1 className="text-2xl font-semibold">
                    Admin Dashboard
                </h1>



                {/* Upload */}

                <form
                    onSubmit={handleUpload}
                    className="mt-6 flex flex-col gap-4 rounded border p-5"
                >

                    <input
                        type="text"
                        placeholder="Model Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        className="rounded border p-2"
                    />


                    <input
                        type="file"
                        accept=".glb"
                        onChange={(e)=>setFile(e.target.files[0])}
                        className="rounded border p-2"
                    />


                    <button
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Upload
                    </button>


                </form>




                {/* Models List */}

                <div className="mt-8">


                    <h2 className="mb-4 text-xl font-semibold">
                        Uploaded Models
                    </h2>



                    <div className="space-y-3">


                    {
                        models.map((model)=>(

                            <div
                                key={model._id}
                                className="flex items-center justify-between rounded border p-4"
                            >


                                {
                                    editId === model._id ? (

                                        <input
                                            value={editTitle}
                                            onChange={(e)=>setEditTitle(e.target.value)}
                                            className="rounded border p-2"
                                        />

                                    ) : (

                                        <span>
                                            {model.title}
                                        </span>

                                    )

                                }




                                <div className="flex gap-2">


                                    {
                                        editId === model._id ? (

                                            <button
                                                onClick={()=>handleUpdate(model._id)}
                                                className="rounded bg-green-600 px-3 py-1 text-white"
                                            >
                                                Save
                                            </button>

                                        ):(

                                            <button
                                                onClick={()=>{
                                                    setEditId(model._id);
                                                    setEditTitle(model.title);
                                                }}
                                                className="rounded bg-yellow-500 px-3 py-1 text-white"
                                            >
                                                Edit
                                            </button>

                                        )
                                    }



                                    <button
                                        onClick={()=>handleDelete(model._id)}
                                        className="rounded bg-red-600 px-3 py-1 text-white"
                                    >
                                        Delete
                                    </button>


                                </div>


                            </div>

                        ))
                    }


                    </div>


                </div>


            </div>


        </div>

    );

};


export default Dashboard;