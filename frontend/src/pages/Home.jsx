import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import axiosInstance from "../helper/axiosHelper";


const Home = () => {

    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const modelRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const cameraRef = useRef(null);
    const controlsRef = useRef(null);

    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);



    // Fetch Models

    const fetchModels = async () => {

        try {

            const response = await axiosInstance.get("/get-models");

            setModels(response.data.data.models);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(()=>{

        fetchModels();

    },[]);



    // Three.js Setup

    useEffect(()=>{

        if(!mountRef.current)
            return;


        const scene = new THREE.Scene();
        sceneRef.current = scene;

        scene.background = new THREE.Color("#eeeeee");



        const camera = new THREE.PerspectiveCamera(
            45,
            mountRef.current.clientWidth /
            mountRef.current.clientHeight,
            0.1,
            1000
        );

        cameraRef.current = camera;


        camera.position.set(0,2,5);



        const renderer = new THREE.WebGLRenderer({
            antialias:true
        });


        renderer.setSize(
            mountRef.current.clientWidth,
            mountRef.current.clientHeight
        );


        mountRef.current.appendChild(
            renderer.domElement
        );



        // Lights

        const ambientLight = new THREE.AmbientLight(
            0xffffff,
            1
        );

        scene.add(ambientLight);



        const directionalLight = new THREE.DirectionalLight(
            0xffffff,
            2
        );

        directionalLight.position.set(5,5,5);

        scene.add(directionalLight);



        // Controls

        const controls = new OrbitControls(
            camera,
            renderer.domElement
        );

        controlsRef.current = controls;

        controls.enableDamping = true;



        const handleResize = () => {

            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;


            camera.aspect = width / height;

            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );

        };


        window.addEventListener(
            "resize",
            handleResize
        );


        // Animation

        const animate = () => {

            requestAnimationFrame(animate);

            controls.update();

            renderer.render(
                scene,
                camera
            );

        };


        animate();


        // cleanup
        return ()=>{

            window.removeEventListener(
                "resize",
                handleResize
            );

            renderer.dispose();

            if (mountRef.current && mountRef.current.contains(renderer.domElement)) 

                mountRef.current.removeChild(
                    renderer.domElement
                );

        };


    },[]);




    // Load GLB Model


    useEffect(()=>{

        if(!selectedModel || !sceneRef.current)
            return;


        const loader = new GLTFLoader();


        setLoading(true);



        if(modelRef.current){

            sceneRef.current.remove(
                modelRef.current
            );

            modelRef.current = null;

        }



        loader.load(

            `https://threed-viewer-web-y5i8.onrender.com/modelupload/${selectedModel.filePath}`,

            (gltf)=>{


                const model = gltf.scene;



                // Auto Center

                const box = new THREE.Box3().setFromObject(model);


                const center = box.getCenter(
                    new THREE.Vector3()
                );


                model.position.sub(center);



                // Auto Scale

                const size = box.getSize(
                    new THREE.Vector3()
                );


                const maxSize = Math.max(
                    size.x,
                    size.y,
                    size.z
                );


                const scale = 3 / maxSize;


                model.scale.set(
                    scale,
                    scale,
                    scale
                );



                sceneRef.current.add(model);


                modelRef.current = model;



                // Camera Reset

                cameraRef.current.position.set(0,1,5);


                controlsRef.current.target.set(0,0,0);


                controlsRef.current.update();



                setLoading(false);


            },


            undefined,


            (error)=>{

                console.log(
                    "GLB Error:",
                    error
                );

                setLoading(false);

            }

        );


    },[selectedModel]);




    return (

        <div className="flex h-[calc(100vh-70px)]">


            <aside className="w-80 border-r bg-white p-5">


                <h2 className="mb-5 text-xl font-semibold">
                    3D Models
                </h2>


                <div className="space-y-3">


                    {
                        models.map((model)=>(

                            <div
                                key={model._id}
                                onClick={()=>setSelectedModel(model)}
                                className="cursor-pointer rounded border p-4 hover:bg-blue-50"
                            >

                                {model.title}

                            </div>

                        ))
                    }


                </div>


            </aside>

            {/* Viewer Loading UI */}

            <main className="flex-1 p-5">

                <div
                    ref={mountRef}
                    className="relative h-full w-full rounded-xl border bg-gray-100"
                >

                    {
                        loading && (

                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">

                                <p className="text-lg font-semibold">
                                    Loading Model...
                                </p>

                            </div>

                        )
                    }


                </div>

            </main>


        </div>

    );

};


export default Home;
