import './admin-register.css';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import '../../common/material/CssTextField'
import { CssTextField } from '../../common/material/CssTextField';
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const MyTextField = CssTextField;


const AdminRegister = () => {
    return ( 
        <div className="admin-register">
            <form className='admin-register-form'>
                <div className="form-title">ADMIN REGISTRATION</div><br />
                <MyTextField className="text-field" name="username" label="Enter new username" variant="outlined"/> <br /><br />
                <MyTextField className="text-field" name="email"  label="Enter your email" variant="outlined"/><br /><br />
                <MyTextField type="password" className="text-field" name="password"  label="Enter new password" variant="outlined"/><br /><br />
                <MyTextField type="password" className="text-field" name="confirm-password"  label="Confirm password" variant="outlined"/><br /><br />
                <Link to="/admin/login" className='already-have-account'>Already have an account?</Link><br /><br />
                <Button className="my-btn-submit" type="submit" variant="primary">Register</Button>
            </form>
                
        </div>
     );
}
 
export default AdminRegister;