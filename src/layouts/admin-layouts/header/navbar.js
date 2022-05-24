
import { NavLink, Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
    return ( 
        <div className="my-navbar">
           <div className="my-navbar-child">

                <div className="left-nav">
                    <Link to="/" className="my-link"><div>Company Logo</div></Link>
                </div>

                <div className="right-nav">
                    <NavLink to="" className="my-link"><div>about us</div></NavLink>
                    <NavLink to="/admin/login" className="my-link"><div>Login</div></NavLink>
                    <NavLink to="/admin/register" className="my-link"><div>Register</div></NavLink>
                    
                    
                </div>

           </div>    
        </div>
     );
}
 
export default Navbar;