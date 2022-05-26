
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { getAuthToken } from '../../../features/adminSlice/adminSlice';
import { getIsOpen, setIsClose, setIsOpen } from '../../../features/navbarSlice/navbarSlice';
import './navbar.css';



const Navbar = () => {

    const token = useSelector(getAuthToken);
    const dispatch = useDispatch();


    const isOpen = useSelector(getIsOpen);

    console.log(isOpen)
    const handleMenu = ()=>{
        dispatch(setIsOpen());
        console.log('hello')
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
    <div className="my-link" ><div onClick={handleMenu}>Logout</div></div>
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