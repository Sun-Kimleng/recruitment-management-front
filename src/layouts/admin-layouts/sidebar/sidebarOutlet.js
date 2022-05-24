import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const SidebarOutlet = () => {
    return ( <div>
        <Sidebar />
        <Outlet />
    </div>
        
     );
}
 
export default SidebarOutlet;