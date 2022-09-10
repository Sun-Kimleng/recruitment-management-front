import './candidateLogin.css'
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { LoginUserKey } from '../../api/admin/userkey';
import { ApiKey } from '../../api/apiKey';
import {apiHeaders} from '../../api/apiHeaders';
import '../../common/material/CssTextField'
import { CssTextField } from '../../common/material/CssTextField';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { setAuthtoken, setAuthUsername, setVerificationToken } from '../../features/adminSlice/adminSlice';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { SetPageTitle } from '../../setPageTitle';
import agb from './AGB.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaFacebookSquare } from "react-icons/fa";
const MyTextField = CssTextField;

const CandidateLogin = () => {
     //Page Title
     SetPageTitle('Admin Login');

     //All States
     const [isShowPassword, setIsShowPassword]= useState(false);
     const [isTooManyAttempt, setIsTooManyAttempt] = useState(false);
     const dispatch = useDispatch();
     const navigate = useNavigate();

        //facebook
        const [facebookUrl, setFacebookUrl] = useState(null);
 
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
     const [error, setError]=useState(['']);
     const handleSubmit = async(e)=>{
         e.preventDefault();
         setIsPending(true);
 
         const data = {email: inputs.email, password: inputs.password};
         const response = await axios.post(`${ApiKey}${LoginUserKey}`, data, apiHeaders);
 
         if(response.data.status === 200){
             dispatch(setVerificationToken(''));
             dispatch(setAuthUsername(response.data.username));
             dispatch(setAuthtoken(response.data.token));
 
             navigate('/admin/dashboard');
             Swal.fire({
                 icon: 'success',
                 title: 'Successful logged in',
                 text: response.data.message,
             
               })
             setError('');
             
             setIsPending(false);
         }
         if(response.data.status === 402){
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: response.data.message,
             
               });
               setError('');
               setIsPending(false);
         }
        
 
         if(response.data.status ===401){
             navigate('/admin/verification_email');
             setError('');
             dispatch(setVerificationToken(response.data.token));
         }
 
         if(response.data.status === 204){
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: 'Your account has been deactivated. Ask admin to reactivate your account',
             
               })
               setIsPending(false);
               setError('');
         }
 
         if(response.data.status === 429){
             setError('');
             setIsPending(false);
             setIsTooManyAttempt(true);
         }else{
             setIsTooManyAttempt(false);
         }
 
         if(response.data.status === 404){
             setError(response.data.error);
             setIsPending(false);
         }
     }

     useEffect(()=>{
        const config = {
            headers:{
                'accept': 'application/json'
            }
        }
        axios.get('http://127.0.0.1:8000/api/login/facebook/url',config)
        .then(response=>{
            setFacebookUrl(response.data.url);
        }).catch(error=>{
            
        });
    },[facebookUrl]);
 
     const login = 'Login';
 
     return ( 
         <div className="my-login">
             <div>
                 <div className='company-logo-parent'><div><img className="company-logo" src={agb} /></div></div>
             </div><br />
             <a href={facebookUrl} className='facebook-login'><FaFacebookSquare style={{fontSize: '20px', margin: '3px 3px 0px 0px', color: 'white'}}/><div> Login with Facebook</div></a>
             
         </div>
      );
}
 
export default CandidateLogin;