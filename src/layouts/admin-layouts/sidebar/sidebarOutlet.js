
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet} from "react-router-dom";
import { getTriggerLeftBar, setTriggerLeftBar, setTriggerLeftBarFalse } from "../../../features/adminSlice/adminSlice";
import { getIsOpen, setIsClose } from "../../../features/navbarSlice/navbarSlice";
import Navbar from "../header/navbar";
import Sidebar from "./sidebar";
import './sidebar.css'


const SidebarOutlet = () => {
    const dispatch = useDispatch();
    const refLeftBar =useRef(null)
    return ( 
    <div>
        <Navbar />
        <Sidebar />
        <div className="body-content">
            <Outlet />
        </div>
    </div>
        
     );
}
 
export default SidebarOutlet;