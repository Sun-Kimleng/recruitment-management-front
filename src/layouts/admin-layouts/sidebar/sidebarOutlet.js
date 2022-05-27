import { useDispatch, useSelector } from "react-redux";
import { Outlet} from "react-router-dom";
import { getIsOpen, setIsClose } from "../../../features/navbarSlice/navbarSlice";
import Sidebar from "./sidebar";



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
        <Sidebar />
        <Outlet />
    </div>
        
     );
}
 
export default SidebarOutlet;