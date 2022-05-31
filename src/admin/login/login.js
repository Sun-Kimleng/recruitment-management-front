import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { LoginUserKey } from '../../api/admin/userkey';
import { ApiKey } from '../../api/apiKey';
import {apiHeaders} from '../../api/apiHeaders';
import '../../common/material/CssTextField'
import { CssTextField } from '../../common/material/CssTextField';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import './login.css';

import { storeLoginError, getLoginError, setAuthtoken, setAuthUsername } from '../../features/adminSlice/adminSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MyTextField = CssTextField;

const Login = () => {

    const [isShowPassword, setIsShowPassword]= useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowAndHidePassword = (e)=>{
        if(e.target.checked){
            setIsShowPassword(true);
        }else{
            setIsShowPassword(false);
        }
    };
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    

    const handleInput=(e)=>{
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const [isPending, setIsPending]= useState(false);
    const error = useSelector(getLoginError);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsPending(true);

        const data = {email: inputs.email, password: inputs.password};
        const response = await axios.post(`${ApiKey}${LoginUserKey}`, data, apiHeaders);

        if(response.data.status === 200){
            dispatch(setAuthUsername(response.data.username));
            dispatch(setAuthtoken(response.data.token));
            
              navigate('/admin/dashboard', { replace: true });
              window.location.reload();
              setTimeout(()=>{
                
              }, 1000);
             
            setIsPending(false);
        }if(response.data.status === 404){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message,
            
              })
              setIsPending(false);
        }
        else{
            dispatch(storeLoginError(response.data.error));
            setIsPending(false);
        }
    }

    return ( 
        <div className="my-login">
            <form onSubmit={handleSubmit} className='login-form'>
                <div className="form-title">Log in</div><br />
                
                <MyTextField onChange={handleInput} error={error.email?true:false} helperText={error.email?error.email:''} value={inputs.email} className="text-field" name="email"  label="Enter your email" variant="outlined"/><br /><br />
                <MyTextField onChange={handleInput} error={error.password? true:false} helperText={error.password?error.password:''}value={inputs.password} type={isShowPassword?'text':'password'} className="text-field" name="password"  label="Enter new password" variant="outlined"/><br /><br />
                <Form.Check onChange={handleShowAndHidePassword} type="checkbox" label="Show password" style={{color:'white'}} /><br />
                <Button disabled={isPending?true:false} className="my-btn-submit" type="submit" variant="primary">{isPending?'Logging in.....':'Login'}</Button>
            </form>
        </div>
     );
}
 
export default Login;