import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../../common/material/CssTextField'
import { CssTextField } from '../../common/material/CssTextField';
import './login.css';

const MyTextField = CssTextField;

const Login = () => {

    const [isShowPassword, setIsShowPassword]= useState(false);

    const handleShowAndHidePassword = (e)=>{
        if(e.target.checked){
            setIsShowPassword(true);
        }else{
            setIsShowPassword(false);
        }
    }

    return ( 
        <div className="my-login">
            <form className='login-form'>
                <div className="form-title">Log in</div><br />
                
                <MyTextField className="text-field" name="email"  label="Enter your email" variant="outlined"/><br /><br />
                <MyTextField type={isShowPassword?'text':'password'} className="text-field" name="password"  label="Enter new password" variant="outlined"/><br /><br />
                <Form.Check onChange={handleShowAndHidePassword} type="checkbox" label="Show password" style={{color:'white'}} /><br />
                <Button className="my-btn-submit" type="submit" variant="primary">Login</Button>
            </form>
        </div>
     );
}
 
export default Login;