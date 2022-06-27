
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Logout } from '../../../api/admin/userkey';
import { ApiKey } from '../../../api/apiKey';
import { getAuth, getAuthToken, setAuthtoken, setAuthUsername, setTriggerLeftBar } from '../../../features/adminSlice/adminSlice';
import { setIsClose} from '../../../features/navbarSlice/navbarSlice';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import './navbar.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Fragment, useEffect, useRef, useState } from 'react';
import { apiHeadersWithToken } from '../../../api/apiHeaders';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({refLeftBar}) => {
    //Redux Toolkit
    const token = useSelector(getAuthToken);
    const auth = useSelector(getAuth);
    const dispatch = useDispatch();
    
    //Router Dom
    const navigate= useNavigate();

    //All States
    const [triggerPf, setTriggerPf] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [user, setUser]=useState(['']);

    //Fetch User
    const handleFetch = async()=>{
        
        const response = await axios.get(`${ApiKey}/api/user/detail`, apiHeadersWithToken(token));

        if(response.data.status === 200){
            setUser(response.data.user);
            setIsPending(false);
        }

    }

    //refresh when something change
    useEffect(()=>{
        handleFetch();
    }, []);

    //handle click outside trigger pf button
    const ref = useRef(null);

    useEffect(()=>{
        const handleClickOutside = (e)=>{
            if(ref.current && !ref.current.contains(e.target)){
                setTriggerPf(false);
            }
        }
            document.addEventListener('mousedown', handleClickOutside);

            return ()=>{
                document.removeEventListener('mousedown', handleClickOutside);
            }
        
    }, [triggerPf]);

    //Logout
    const handleLogout = async()=>{

        const headers= {
            'Content-Type': 'application/json',
            'Authorization': token? `Bearer ${token}`: ''
        }

        const response = await axios.post(`${ApiKey}${Logout}`,{},{headers})
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
    rightBar = (<div  ref={ref} className='right-nav' style={{marginRight: '15px'}}><NavLink to="" className="my-link"><div>about us</div></NavLink>
    
  
    <Fragment><div onClick={()=>setTriggerPf(!triggerPf)} className='profile-trigger'><ArrowDropDownIcon className='arrow' /></div></Fragment>
    {triggerPf && <div className="pf-parent">
                <div className="pf-child">
                    <div className="pf-picture">

                    </div>
                    <div className="pf-name">
                        <div className="name">{user.username}</div>
                        <div className="see-profile" style={{color: 'grey'}}>See Your Profile</div>
                    </div>
                </div>
                <hr style={{color: 'grey'}}/>
                <div className="logout-parent">
                    <div className="logout-child" ><div onClick={handleLogout}><LogoutIcon /> Logout</div></div>
                </div>
            </div>}    
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
                    <div className='toggle-left-bar'onClick={()=>dispatch(setTriggerLeftBar())}><DensitySmallIcon className='toggle-left-bar'/></div>
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