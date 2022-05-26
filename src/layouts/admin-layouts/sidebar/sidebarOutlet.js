import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./sidebar";



const SidebarOutlet = () => {
    return ( 
    <>
        <Sidebar />
        <Outlet />
    </>
        
     );
}
 
export default SidebarOutlet;