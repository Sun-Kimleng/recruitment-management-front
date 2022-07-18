import './admin-register.css';
import '../../common/material/CssTextField'
import { CssTextField } from '../../common/material/CssTextField';
import {Button, Form} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {apiHeaders} from '../../api/apiHeaders';
import {useDispatch, useSelector} from 'react-redux'
import { asyncCreateAdmin, clearError, storeRegisterError, getRegisterError, setAuthFalse, setAuthtoken, setVerificationToken } from '../../features/adminSlice/adminSlice';
import axios from 'axios';
import { ApiKey } from '../../api/apiKey';
import { CreateUserKey } from '../../api/admin/userkey';
import Swal from 'sweetalert2';
import { SetPageTitle } from '../../setPageTitle';

const MyTextField = CssTextField;


const AdminRegister = () => {

//Page Title
SetPageTitle('Admin Register');

//All States
const dispatch = useDispatch();
const navigate = useNavigate();
const error = useSelector(getRegisterError);

SetPageTitle('');

const [isShowPassword, setIsShowPassword]= useState(false);

const handleShowAndHidePassword = (e)=>{
    if(e.target.checked){
        setIsShowPassword(true);
    }else{
        setIsShowPassword(false);
    }
}
    
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
//redux asycn call

const [isPending, setIsPending]= useState(false);
//handle output
const handleSubmit =async (e) =>{
    e.preventDefault();
    const data= {email: registerInput.email, username: registerInput.username, password: registerInput.password, confirmPassword: registerInput.confirmPassword};
    
    setIsPending(true);
    const response = await axios.post(`${ApiKey}${CreateUserKey}`, data, {apiHeaders});

    if(response.data.status === 200){
          dispatch(setVerificationToken(response.data.token))
          setIsPending(false);
          dispatch(clearError);
          navigate('/admin/verification_email');
    }else{
        setIsPending(false);
        dispatch(storeRegisterError(response.data.error));
    }
}
    return ( 
        <div className="admin-register">
            <form onSubmit={handleSubmit} className='admin-register-form'>
                <div className="form-title">ADMIN REGISTRATION</div><br />
                <MyTextField onChange={handleInput} error={error.username?true:false} helperText={error.username?error.username:""} value={registerInput.username} className="text-field" name="username" label="Enter new username" variant="outlined"/> <br /><br />
                <MyTextField onChange={handleInput} error={error.email?true:false} helperText={error.email?error.email:""} value={registerInput.email} className="text-field" name="email"  label="Enter your email" variant="outlined"/><br /><br />
                <MyTextField onChange={handleInput} error={error.password?true:false} helperText={error.password?error.password:""} value={registerInput.password} type={isShowPassword?'text':'password'} className="text-field" name="password"  label="Enter new password" variant="outlined"/><br /><br />
                <MyTextField onChange={handleInput} error={error.confirmPassword?true:false} helperText={error.confirmPassword?error.confirmPassword:""} value={registerInput.confirmPassword} type={isShowPassword?'text':'password'} className="text-field" name="confirmPassword"  label="Confirm password" variant="outlined"/><br /><br />
                <Form.Check onChange={handleShowAndHidePassword} type="checkbox" label="Show password" style={{color:'white'}} /><br />
                <Link to="/admin/login" className='already-have-account'>Already have an account?</Link><br /><br />
                <Button disabled={isPending?true:false} className="my-btn-submit" type="submit" variant="primary">{isPending?'Registering....':'Register'}</Button>
                
            </form>
            
            
                
        </div>
     );
}
 
export default AdminRegister;