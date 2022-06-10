import './resetPassword.css';
import {useState} from 'react';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getEmailPasswordReset, setEmailPasswordReset } from '../../features/adminSlice/adminSlice';
import { ApiKey } from '../../api/apiKey';
import Swal from 'sweetalert2';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const resetPasswordEmail = useSelector(getEmailPasswordReset);
    const resetPasswordToken = window.location.search.substring(7);
    
    const [text, setText]=useState('Change Password');
    const [error, setError]= useState(['']);
    const [isSending, setIsSending]=useState(false);

    const [inputs, setInputs] = useState({
        password: '',
        password_confirmation: '',
    });

    const handleInput = (e)=>{
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setText('Proccesing....');
        setIsSending(true);
        const data={token: resetPasswordToken, email: resetPasswordEmail, password: inputs.password, password_confirmation: inputs.password_confirmation}
        
        const headers ={
            'accept': 'applicaton/json',
            'Authorization': `Bearer ${resetPasswordToken}`,
        }

        await axios.post(`${ApiKey}/api/reset-password`, data, {headers})
        .then(response=>{
            dispatch(setEmailPasswordReset(''));
            Swal.fire(
                'Your password has been changed',
                'Please, login again',
                'success'
              )
            
        }).catch(error=>{
            setError(error.response.data.errors);
            setText('Change Password');
            setIsSending(false);
            console.clear();
        });

    }

    return ( 
        <div className="reset-password">
            
            <br />
            <h2 style={{textAlign:'center'}}>Create your new password</h2>

            <form onSubmit={handleSubmit} className='reset-password-form'>
                <br />
                <TextField error={error.password?true:false} helperText={error.password?error.password:''} onChange={handleInput} value={inputs.password} type="password" id="outlined-basic password" label="Enter New Password" variant="outlined" name="password"/><br />
                <TextField error={error.password?true:false} helperText={error.password?error.password:''} onChange={handleInput} value={inputs.password_confirmation}type="password" id="outlined-basic c_password" label="Confirm New Password" variant="outlined" name="password_confirmation" /><br />
                <Button disabled={isSending?true:false} style={isSending?{cursor:'no-drop'}:{cursor:'pointer'}} type="submit" variant="primary">{text}</Button>
            </form>
         
        </div>
     );
}
 
export default ResetPassword;