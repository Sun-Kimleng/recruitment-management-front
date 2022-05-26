
import {Routes, Route} from 'react-router-dom';
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
import { getAuthToken } from './features/adminSlice/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleChevronDown} from '@fortawesome/free-solid-svg-icons'



function App() {
  const dispatch = useDispatch();
  const isOpen = useSelector(getIsOpen);

  const token = useSelector(getAuthToken);
   let snackbar;
   let triggerSnackbar;
  if(token){
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
          <Route path="/admin/register" element={<AdminRegister />}/>
          <Route path="/admin/login" element={<Login />}/>
            
            <Route element={<SidebarOutlet />} >
              
              <Route path="/admin/dashboard" element={<Dashboard />} />  
            
            </Route>
            
      
        </Routes>
        </div>
        {/* All Routes */}


    </div>
  );
}

export default App;
