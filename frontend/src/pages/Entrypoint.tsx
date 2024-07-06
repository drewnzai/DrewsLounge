import { Navigate, Outlet } from "react-router-dom";

export default function Entrypoint(){
    
    const user: any | null = localStorage.getItem("user");

    return(
       user? <div className="app">

            <main className="content">
            
            <Outlet/>
            </main>

        </div>

        : <Navigate to={"/login"}/>
    );
}