
import {Routes, Route, Navigate} from 'react-router-dom';
import AdminRegister from './admin/register/admin-register';
import './App.css'
import Login from './admin/login/login';
import Home from './admin/home/home';
import Dashboard from './admin/dashboard/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getIsOpen, setIsClose, setIsOpen } from './features/navbarSlice/navbarSlice';
import SidebarOutlet from './layouts/admin-layouts/sidebar/sidebarOutlet';
import { asyncCheckAuth, getAuth, getAuthToken,getEmailPasswordReset,getVerificationToken,setAuth,setAuthFalse,setAuthtoken, setAuthTrue, setAuthUsername } from './features/adminSlice/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleChevronDown} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ApiKey } from './api/apiKey';
import VerificationEmail from './admin/verificationEmail/verificationEmail';
import Verifying from './admin/verificationEmail/verifying';
import ForgetPassword from './admin/forgetPassword/forgetPassword';
import ResetPassword from './admin/resetPassword/resetPassword';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isOpen = useSelector(getIsOpen);
  const auth = useSelector(getAuth);
  const verifyToken = useSelector(getVerificationToken);
  const emailResetPassword = useSelector(getEmailPasswordReset);
  
  const token = useSelector(getAuthToken);
   let snackbar;
   let triggerSnackbar;

   
    const checkAuthFunc = async() =>{
      const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    await axios.get(`${ApiKey}/api/user/checkAuth`,config)
    .then(
      response=>{
        if(response.status == 200){
          dispatch(setAuthTrue());
        }
      }
    ).catch(error=>{
      dispatch(setAuthFalse());
      dispatch(setAuthtoken(''));
      dispatch(setAuthUsername(''));
    });

    }

    useEffect(()=>{
      checkAuthFunc();
      return ()=>{
        setAuthFalse();
       
      }
    }, [token]);


  if(token && auth){
    snackbar = (<>{isOpen && <div className="snackbar"></div>}</>)
    triggerSnackbar=(<><FontAwesomeIcon className='snackbar-trigger' onClick={()=>dispatch(setIsOpen())} icon={faCircleChevronDown} /></>)
  }

  return (
    <div className="App" >

        {/* Added Features */}
            {snackbar}
            {triggerSnackbar}
        {/* Added Features */}

        
        
        <br /><br />

        {/* All Routes */}
        <div onClick={()=>dispatch(setIsClose())}>
        <Routes>
          
          {/* Admin Home Page */}
          <Route path="/" element={<Home />}/>

          {/* Login and Register */}
          <Route path="/admin/register" element={token && auth?<Navigate to="/admin/dashboard" replace/>:<AdminRegister />}/>
          <Route path="/admin/login" element={token && auth?<Navigate to="/admin/dashboard" replace/>:<Login />}/>
          
          {/* Email Verification */}
          <Route path="/admin/verification_email" element={verifyToken?<VerificationEmail />:<Navigate to="/admin/login" replace/>}/>
          <Route path="/admin/verifying" element={verifyToken?<Verifying />:<Navigate to="/admin/login"/>}/>
          
          {/* Forget Password */}
          <Route path="/admin/forget_password" element={<ForgetPassword />}/>
          <Route path="/admin/reset_password" element={emailResetPassword?<ResetPassword />:<Navigate to="/admin/login" />}/>

          {/* For Auth User Only */}
            <Route element={token && auth?<SidebarOutlet />:<Navigate to="/admin/login" />} >

                <Route path="/admin/dashboard" element={<Dashboard />} />  

            </Route>
          {/* For Auth User Only */}

        </Routes>
        </div>
        {/* All Routes */}

        {/* Footer */}

        {/* Footer */}

    </div>
  );
}

export default App;
