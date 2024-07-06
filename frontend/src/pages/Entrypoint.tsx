import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Entrypoint(){
    
    const user: any | null = localStorage.getItem("user");

    return(
       user? <div className="app">
                
                <Sidebar/>

            <main className="content">
            <Outlet/>
            </main>

        </div>

        : <Navigate to={"/login"}/>
    );
}