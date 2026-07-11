import { useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {

    const navigate=useNavigate();


    return (
        <nav className="flex h-[70px] items-center justify-between border-b bg-white px-8 shadow-sm">

            <h2 className="text-2xl font-bold text-blue-600">
                3D Model Viewer
            </h2>

            <div className="flex items-center gap-4">

                <button
                    onClick={()=>navigate("/")}
                    type="button"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                    Home
                </button>

                <button
                    onClick={()=>navigate("/dashboard")}
                    type="button"
                    className="rounded-md bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-900"
                >
                    Dashboard
                </button>

            </div>

        </nav>
    );
};

export default Navbar;