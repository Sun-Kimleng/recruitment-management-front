import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ApiKey } from '../../api/apiKey';
import { getVerificationToken, setVerificationToken } from '../../features/adminSlice/adminSlice';
import './verificationEmail.css';


const VerificationEmail = () => {   

    const verifyToken = useSelector(getVerificationToken);
    const dispatch = useDispatch();

    const [verifyBtnText, setVerifyBtnText]= useState('Resend verification email')
    const [isSending, setIsSending]= useState(false);


    const handleClick = async()=>{
        setVerifyBtnText('sending.....')
        setIsSending(true);
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${verifyToken}`
        }

        await axios.get(`${ApiKey}/api/email/resend`, {headers})
        .then(response=>{
           
            setVerifyBtnText('Message has been sent to you email!')
        });
    }

    return ( 
        <div className="verification-email"><br />
            <h2 className="header">Please check your email to verification</h2>
            
            <br/>
            <p className="header">If you don't get any message please click on resend email verification below</p>
            
            <div className='btn-verify' ><Button disabled={isSending? true : false} onClick={handleClick} type="submit" variant="secondary">{verifyBtnText}</Button></div>
        </div> 
    );
}
 
export default VerificationEmail;