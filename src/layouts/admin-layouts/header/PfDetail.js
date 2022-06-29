import { TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiHeadersWithToken } from '../../../api/apiHeaders';
import { ApiKey } from '../../../api/apiKey';
import { getAuthToken } from '../../../features/adminSlice/adminSlice';
import './pfDetail.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { SetPageTitle } from '../../../setPageTitle';



const PfDetail = () => {
    //Redux Toolkit
    const token = useSelector(getAuthToken);
    
    //React Router Dom
    const {user_id} = useParams();
    
    //All States
    const [isPending, setIsPending] = useState(true);
    const [user, setUser] = useState(['']);
    const [isRefresh, setIsRefresh] = useState(false);
    const [submitTextEmail, setSubmitTextEmail] = useState("Change Email");
    const [submitTextResend, setSubmitTextResend] = useState("Resend email verification");
    const [submitTextUsername, setSubmitTextUsername] = useState("Save");
    const [isUpdating, setIsUpdating] = useState({
        email: false,
        resend: false,
        username: false,
    });
    const [error, setError]= useState(['']);
    const [inputs, setInputs]= useState({
        username: '',
        email: '',
    });
    //Page Title
    SetPageTitle(user.username);
    //handle inputs
    const handleUpdateInputs = (e)=> {
        return setInputs({...inputs, [e.target.name]: e.target.value});
    } 

    //Fetch User
    const handleFetch = async()=>{
        
        const response = await axios.get(`${ApiKey}/api/user/detail`, apiHeadersWithToken(token));

        if(response.data.status === 200){
            const data = response.data.user;
            setUser(data);
            setInputs({username: data.username, email: data.email});
            setIsPending(false);
        }
    }

    //Update Email
    const handleUpdateEmail = async(e) =>{
        e.preventDefault();

        setIsUpdating({email: true});
        setSubmitTextEmail("Changing Email...");
        const data = {email: inputs.email}
        const response = await axios.post(`${ApiKey}/api/user/update_email`, data, apiHeadersWithToken(token));
        
        const res = response.data;

        if(res.status == 200){
              setIsRefresh(!isRefresh);
              setError(['']);
              setSubmitTextEmail("Done");
        }else{
            setSubmitTextEmail("Change Email");
            setIsUpdating({email: false});
            setError(res.errors);
        }
    }
    //Resend Verification Email
    const handleResendClick = async()=>{
        setIsUpdating({resend: true})
        setSubmitTextResend("Sending");

        await axios.get(`${ApiKey}/api/email/resend`, apiHeadersWithToken(token))
        .then(response=>{
            setSubmitTextResend("Mail was sent, please check your inbox");
        });
    }
    
    //Update Username
    const handleUpdateUsername = async(e) => {
        e.preventDefault();

        const data = {username: inputs.username};
        setIsUpdating({username: true});
        setSubmitTextUsername("Saving...");
        const response = await axios.post(`${ApiKey}/api/user/update_username`, data, apiHeadersWithToken(token));
        
        if(response.data.status === 200){
            Swal.fire(
                'Done!',
                'Succesful changed',
                'success'
              )
            setError(['']);
            setSubmitTextUsername('Save');
        }else{
            setIsUpdating({username: false});
            setSubmitTextUsername("Save");
            setError(response.data.errors);
        }

    }

    //refresh when something changes
    useEffect(()=>{
        handleFetch();
    }, [isRefresh]);

        if(isPending === true){
            return (
                <div
                    style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }} 
                ><div><Spinner animation="border"/></div></div>

            )
        }else{

            if( user_id === user.user_id){
                return (
                    
                    <div className="pf-detail">
                        <br />
                        <div className="pf-detail-parent">
                            <div className="pf-detail-avatar-parent">
                                <div className="pf-detail-avatar"></div>
                            </div>

                            <div className="pf-detail-username-parent">
                                <div><b>{inputs.username}</b></div>
                            </div>

                            <div className="pf-detail-update">
                                <br />
                                <form onSubmit={handleUpdateUsername}>
                                    <div>CHANGE USERNAME</div><br />
                                    <TextField error={error.username?true:false} helperText={error.username?error.username:''} type="text" name="username" value={inputs.username} onChange={handleUpdateInputs} id="outlined-basic" className='pf-detail-input' label="Username" variant="outlined" />< br/>
                                    <div id={isUpdating.username || inputs.username === user.username?'no-drop-btn':''}><Button disabled={isUpdating.username || inputs.username === user.username?true:false} type="submit" variant="primary" className="btn-submit">{submitTextUsername}</Button></div>
                                </form><br />

                                <form onSubmit={handleUpdateEmail}>
                                    <div>CHANGE EMAIL</div><br />
                                    <TextField error={error.email?true:false} helperText={error.email ? error.email: ''} type="email" name="email" value={inputs.email} onChange={handleUpdateInputs}id="outlined-basic" className='pf-detail-input' label="Email" variant="outlined" />
                                    <div id={isUpdating.email?'no-drop-btn':''}><Button disabled={isUpdating.email?true:false}  type="submit" variant="warning" className="btn-submit">{submitTextEmail}</Button></div>
                                    {submitTextEmail === 'Done'&&<div className='successful-changed'>Your Email has been Changed.</div>}
                                    {user.email_verified_at == null ? <div ><div className='verify-text'><p><DoDisturbOnIcon style={{fontSize: '18px'}} />Your Email is not verify</p><p>Please Check your email inbox to verify your email. If you cannot find the mail please click the below button</p><p><b>Note:</b> You have to login again after you verified your email</p><div id={isUpdating.resend?'no-drop-btn':''}><Button onClick={handleResendClick} disabled={isUpdating.resend?true:false} variant='primary' style={{width: '100%'}}>{submitTextResend}</Button></div></div></div>
                                    :<div className='successful-changed'><CheckCircleIcon style={{fontSize: '18px'}}/>Your email is verified.</div>}
                                </form>

                                <br />
                                <div>
                                    <div>Want to change your password? click this below button</div>
                                    <div><Button variant="secondary" className="btn-submit">Change Password</Button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }else{
                return (
                    <div className="pf-detail">
                        <br />
                        un-auth user
                    </div>
                );
            }    
    }
}
 
export default PfDetail;