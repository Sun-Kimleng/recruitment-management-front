
import {Routes, Route, Navigate} from 'react-router-dom';
import AdminRegister from './admin/register/admin-register';
import Navbar from './layouts/admin-layouts/header/navbar';
import './App.css'
import Sidebar from './layouts/admin-layouts/sidebar/sidebar';
import Login from './admin/login/login';
import Home from './admin/home/home';
import Dashboard from './admin/dashboard/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getIsOpen, setIsClose, setIsOpen } from './features/navbarSlice/navbarSlice';
import SidebarOutlet from './layouts/admin-layouts/sidebar/sidebarOutlet';
import { asyncCheckAuth, getAuth, getAuthToken,setAuth,setAuthFalse,setAuthtoken, setAuthTrue, setAuthUsername } from './features/adminSlice/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleChevronDown} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ApiKey } from './api/apiKey';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isOpen = useSelector(getIsOpen);
  const auth = useSelector(getAuth);
  
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
      console.clear();
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
        {snackbar}
        {triggerSnackbar}
        <Navbar />
        {/* All Routes */}
        <div onClick={()=>dispatch(setIsClose())}>
        <Routes>
          
          <Route path="/" element={<Home />}/>
          <Route path="/admin/register" element={token && auth?<Navigate to="/admin/dashboard" replace/>:<AdminRegister />}/>
          <Route path="/admin/login" element={token && auth?<Navigate to="/admin/dashboard" replace/>:<Login />}/>
            
            <Route element={token && auth?<SidebarOutlet />:<Navigate to="/admin/login" />} >
              
              <Route path="/admin/dashboard" element={<Dashboard />} />  
            
            </Route>
            
      
        </Routes>
        </div>
        {/* All Routes */}


    </div>
  );
}

export default App;
