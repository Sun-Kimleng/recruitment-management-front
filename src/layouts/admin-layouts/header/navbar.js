import {Container, Dropdown, DropdownButton, SplitButton} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
    return ( 
        <div className="my-navbar">
           <div className="my-navbar-child">

                <div className="left-nav">
                    <NavLink to="" className="my-link"><div>Home</div></NavLink>
                </div>

                <div className="right-nav">
                    <NavLink to="" className="my-link"><div>Detail</div></NavLink>
                    <NavLink to="" className="my-link"><div>Login</div></NavLink>

                </div>

           </div>    
        </div>
     );
}
 
export default Navbar;