import { Button } from 'react-bootstrap';
import '../../common/material/CssTextField'
import { CssTextField } from '../../common/material/CssTextField';
import './login.css';

const MyTextField = CssTextField;

const Login = () => {
    return ( 
        <div className="my-login">
            <form className='login-form'>
                <div className="form-title">Log in</div><br />
                
                <MyTextField className="text-field" name="email"  label="Enter your email" variant="outlined"/><br /><br />
                <MyTextField type="password" className="text-field" name="password"  label="Enter new password" variant="outlined"/><br /><br />
                <Button className="my-btn-submit" type="submit" variant="primary">Login</Button>
            </form>
        </div>
     );
}
 
export default Login;