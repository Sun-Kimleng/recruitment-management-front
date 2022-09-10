import {Routes, Route, Navigate} from 'react-router-dom';
import AdminRegister from './admin/register/admin-register';
import './App.css'
import Login from './admin/login/login';
import Home from './admin/home/home';
import Dashboard from './admin/dashboard/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getIsOpen, setIsClose, setIsOpen } from './features/navbarSlice/navbarSlice';
import SidebarOutlet from './layouts/admin-layouts/sidebar/sidebarOutlet';
import {getAuth, getAuthToken,getEmailPasswordReset,getVerificationToken,setAuth,setAuthFalse,setAuthtoken, setAuthTrue, setAuthUsername } from './features/adminSlice/adminSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ApiKey } from './api/apiKey';
import VerificationEmail from './admin/verificationEmail/verificationEmail';
import Verifying from './admin/verificationEmail/verifying';
import ForgetPassword from './admin/forgetPassword/forgetPassword';
import ResetPassword from './admin/resetPassword/resetPassword';
import Job from './admin/job/job';
import PfDetail from './layouts/admin-layouts/header/PfDetail';
import RedirectAfterPwChanged from './layouts/admin-layouts/header/redirectAfterPwChanged';
import ManageUser from './admin/manageUser/manageUser';
import CandidateOutlet from './layouts/candidate-layouts/candidateOutlets';
import HomePage from './candidate/Home/homePage.js';
import './variable.css';
import CandidateLogin from './candidate/Login/candidateLogin';
import { getCandidateAuth } from './features/candidateSlice/candidateSlice';
import FacebookLogin from './candidate/Login/facebookLogin';
import UserDetails from './candidate/userDetails/userDetails';
import MyTest from './myTest';
import CandidateInfo from './candidate/Login/candidateInfo';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isOpen = useSelector(getIsOpen);
  const auth = useSelector(getAuth);
  const verifyToken = useSelector(getVerificationToken);
  const emailResetPassword = useSelector(getEmailPasswordReset);
  const token = useSelector(getAuthToken);
  const candidateToken = useSelector(getCandidateAuth);
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

  return (
    <div className="App" >

        {/* Added Features */}
          
        {/* Added Features */}
        
        <br /><br />

        {/* All Routes */}
        <div onClick={()=>dispatch(setIsClose())}>
        <Routes>
          <Route path="test" element={<MyTest />}/>
          {/* Admin Home Page */}
          <Route path="/admin/home" element={<Home />}/>

          {/* Login and Register */}
          <Route path="/admin/register" element={token && auth?<Navigate to="/admin/dashboard" replace/>:<AdminRegister />}/>
          <Route path="/admin/login" element={token && auth?<Navigate to="/admin/dashboard" replace/>:<Login />}/>

          {/* Login via Facebook */}
          <Route path="/auth/facebook" element={<FacebookLogin />}/>

          <Route path="/login" element={candidateToken ?<Navigate to="/" replace/>:<CandidateLogin />}/>
        
          {/* Email Verification */}
          <Route path="/admin/verification_email" element={verifyToken?<VerificationEmail />:<Navigate to="/admin/login" replace/>}/>
          <Route path="/admin/verifying" element={verifyToken?<Verifying />:<Navigate to="/admin/login"/>}/>
          
          {/* Forget Password */}
          <Route path="/admin/forget_password" element={<ForgetPassword />}/>
          <Route path="/admin/reset_password" element={emailResetPassword?<ResetPassword />:<Navigate to="/admin/login" />}/>
          
          {/* Redirect after password changed */}
          <Route path="/logging_out" element={<RedirectAfterPwChanged />} />

          {/* For Admin Auth User Only */}
            <Route element={token && auth?<SidebarOutlet />:<Navigate to="/admin/login" />} >
              
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/jobs" element={<Job />} />  
                <Route path="/admin/:user_id" element={<PfDetail />}/>
                <Route path="/admin/manage_user" element={<ManageUser />} />

            </Route>

            {/* For Candidate User Only */}
            <Route element={<CandidateOutlet />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            {/* Candiate Auth */}
            <Route element={candidateToken ? <CandidateOutlet />:<Navigate to="/" />}>
              <Route path="/candidate_info" element={<CandidateInfo />}/>
              <Route path="/user/:user_id" element={<UserDetails />} />
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
