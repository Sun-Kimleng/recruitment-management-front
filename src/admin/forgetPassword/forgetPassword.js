import './forgetPassword.css';
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import { ApiKey } from '../../api/apiKey';
import { useDispatch } from 'react-redux';
import { setEmailPasswordReset } from '../../features/adminSlice/adminSlice';
import AccountCircle from '@mui/icons-material/AccountCircle';

const ForgetPassword = () => {
    const dispatch = useDispatch();

    const [text, setText]=useState('Reset Password');
    const [isSending, setIsSending]=useState(false);
    const [isSent, setIsSent]=useState(false);
    const [error, setError]= useState('');

    const [inputs, setInputs]= useState(
        {
            email: '',
        }
    )

    const handleInput = (e)=>{
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        setIsSending(true);
        setText('Sending reset password email......')

        const headers = {
            'accept': 'application/json'
        }

        const data = {email: inputs.email};
      
        await axios.post(`${ApiKey}/api/forget-password`, data, {headers})
        .then(response=>{
            setIsSent(true);
            setError('');
            setText(response.data.status);
            dispatch(setEmailPasswordReset(inputs.email));
        })
        .catch(error=>{
            setText('Reset Password');
            setIsSending(false);
            setError(error.response.data.errors.email);
            console.clear()
        });
    }
    return ( 
        <div className="forget-password">
            <form onSubmit={handleSubmit} className="forgetpassword-form">
                <br />
                <h2 style={{textAlign:'center'}}>Please enter your email to reset your password</h2>

                <br />
                <div className="forget-password-email">
                <TextField type="email" style={{width: '300px'}} onChange={handleInput} value={inputs.email} name='email' label="Enter your email" variant="standard" id="input-with-icon-textfield" InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }} />
                </div>

                <br />
                {error && <p style={{textAlign: 'center', color:'red'}}>{error}</p>}
                <div className="forget-password-btn">
                    <button type='submit' disabled={isSent || isSending?true:false} className="forget-password-submit-btn">{text}</button>
                </div>
                <br />
                    {isSent && <h3 style={{textAlign:'center'}}>Please check your email box!</h3>}
            </form>
        </div>
     );
}
 
export default ForgetPassword;