
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Logout } from '../../../api/admin/userkey';
import { apiAuthorizationLogout } from '../../../api/apiHeaders';
import { ApiKey } from '../../../api/apiKey';
import { getAuthToken, setAuthtoken, setAuthUsername } from '../../../features/adminSlice/adminSlice';
import { getIsOpen, setIsClose, setIsOpen } from '../../../features/navbarSlice/navbarSlice';
import './navbar.css';




const Navbar = () => {

    const token = useSelector(getAuthToken);
    const dispatch = useDispatch();
    const navigate=useNavigate();


    const isOpen = useSelector(getIsOpen);
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token? `Bearer ${token}`: ''
        }
    }
    const handleLogout = async()=>{

        const response = await axios.post(`${ApiKey}${Logout}`,{},config)

        if(response.data.status == 200){
            navigate('/admin/login');
            dispatch(setAuthtoken(''));
            dispatch(setAuthUsername(''));
            
            Swal.fire({
                title: 'Attention!',
                icon: 'info',
                text: "You\'ve been logged out"
              })
        }
    }
    let rightBar;

if(!token){
    rightBar = ( 
        <>
        <NavLink to="/admin/login" className="my-link"><div>Login</div></NavLink>
        <NavLink to="/admin/register" className="my-link"><div>Register</div></NavLink>
        </>
    );   
}else{
    rightBar = <><NavLink to="" className="my-link"><div>about us</div></NavLink>
    <div className="my-link" ><div onClick={handleLogout}>Logout</div></div>
    {isOpen && <div className="snackbar"></div>}
    </>
}

    return ( 
        <div className="my-navbar" onClick={()=>dispatch(setIsClose())}>
            
           <div className="my-navbar-child">

                <div className="left-nav">
                    <Link to="/" className="my-link"><div>Company Logo</div></Link>
                </div>

                <div className="right-nav">
                    
                    {rightBar}
                </div>

           </div>    
        </div>
     );
}
 
export default Navbar;