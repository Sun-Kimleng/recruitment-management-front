
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Logout } from '../../../api/admin/userkey';
import { apiAuthorizationLogout } from '../../../api/apiHeaders';
import { ApiKey } from '../../../api/apiKey';
import { getAuth, getAuthToken, setAuthtoken, setAuthUsername } from '../../../features/adminSlice/adminSlice';
import { getIsOpen, setIsClose, setIsOpen } from '../../../features/navbarSlice/navbarSlice';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import './navbar.css';




const Navbar = () => {

    const token = useSelector(getAuthToken);
    const auth = useSelector(getAuth);
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
        .catch(error=>{
            console.log(error.response);
        });

        if(response.data.status == 200){
            navigate('/admin/login', {replace: true});
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
if(token && auth){
    rightBar = (<div className='right-nav' style={{marginRight: '60px'}}><NavLink to="" className="my-link"><div>about us</div></NavLink>
    <div className="my-link" ><div onClick={handleLogout}>Logout</div></div>
    {isOpen && <div className="snackbar"></div>}
    </div>);
    
}else{
    rightBar = ( 
        <div className='right-nav'>
        <NavLink to="/admin/login" className="my-link"><div>Login</div></NavLink>
        <NavLink to="/admin/register" className="my-link"><div>Register</div></NavLink>
        </div>
    );   
}

    return ( 
        <div className="my-navbar" onClick={()=>dispatch(setIsClose())}>
            
           <div className="my-navbar-child">

                <div className="left-nav">
                    <div className='left-nav-child'>
                    <div className='toggle-left-bar'><DensitySmallIcon className='toggle-left-bar'/></div>
                    </div>
                    <div className='left-nav-child'>
                    <div><Link to="/" className="my-link"><div>Company Logo</div></Link></div>
                    </div>
                </div>

                {/* <div className="right-nav"> */}
                    
                    {rightBar}
                {/* </div> */}

           </div>    
        </div>
     );
}
 
export default Navbar;