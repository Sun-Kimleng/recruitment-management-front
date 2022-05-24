import './admin-register.css';
import '../../common/material/CssTextField'
import { CssTextField } from '../../common/material/CssTextField';
import {Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const MyTextField = CssTextField;


const AdminRegister = () => {
    
const [registerInput, setRegisterInput]= useState({
    email: '',
    username: '',
    password:'',
    confirmPassword: '',
});

//handle input
const handleInput = (e)=>{
   
    setRegisterInput({...registerInput, [e.target.name]: e.target.value});
}

//handle output
const handleSubmit = (e) =>{
    e.preventDefault();
    const data= {email: registerInput.email, username: registerInput.username, password: registerInput.password, confirmPassword: registerInput.confirmPassword};
    console.log(data);
}
    return ( 
        <div className="admin-register">
            <form onSubmit={handleSubmit} className='admin-register-form'>
                <div className="form-title">ADMIN REGISTRATION</div><br />
                <MyTextField onChange={handleInput} value={registerInput.username} className="text-field" name="username" label="Enter new username" variant="outlined"/> <br /><br />
                <MyTextField onChange={handleInput} value={registerInput.email} className="text-field" name="email"  label="Enter your email" variant="outlined"/><br /><br />
                <MyTextField onChange={handleInput} value={registerInput.password} type="password" className="text-field" name="password"  label="Enter new password" variant="outlined"/><br /><br />
                <MyTextField onChange={handleInput} value={registerInput.confirmPassword} type="password" className="text-field" name="confirmPassword"  label="Confirm password" variant="outlined"/><br /><br />
                <Form.Check type="checkbox" label="Show password" style={{color:'white'}} />
                <Link to="/admin/login" className='already-have-account'>Already have an account?</Link><br /><br />
                <Button className="my-btn-submit" type="submit" variant="primary">Register</Button>
            </form>
            
            
                
        </div>
     );
}
 
export default AdminRegister;