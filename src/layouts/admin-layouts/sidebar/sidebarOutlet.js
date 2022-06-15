
import { useDispatch, useSelector } from "react-redux";
import { Outlet} from "react-router-dom";
import { getIsOpen, setIsClose } from "../../../features/navbarSlice/navbarSlice";
import Navbar from "../header/navbar";
import Sidebar from "./sidebar";
import './sidebar.css'


const SidebarOutlet = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(getIsOpen);
    const handleIsOpen=()=>{
        if(isOpen == true){
            dispatch(setIsClose())
        }
    }

    
    return ( 
    <div onClick={handleIsOpen}>
        <Navbar />
        <Sidebar />
        <div className="body-content">
            <Outlet />
        </div>
    </div>
        
     );
}
 
export default SidebarOutlet;