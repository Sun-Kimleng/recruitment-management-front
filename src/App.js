
import {Routes, Route} from 'react-router-dom';
import AdminRegister from './admin/register/admin-register';
import Navbar from './layouts/admin-layouts/header/navbar';
import './App.css'
import Sidebar from './layouts/admin-layouts/sidebar/sidebar';
import Login from './admin/login/login';
import Home from './admin/home/home';
import Dashboard from './admin/dashboard/dashboard';
import { useDispatch } from 'react-redux';
import { setIsClose } from './features/navbarSlice/navbarSlice';
import SidebarOutlet from './layouts/admin-layouts/sidebar/sidebarOutlet';




function App() {
  const dispatch = useDispatch();
  return (
    <div className="App" >
      
        <Navbar />

        {/* All Routes */}
     
        <Routes>
          
          <Route path="/" element={<Home />}/>
          <Route path="/admin/register" element={<AdminRegister />}/>
          <Route path="/admin/login" element={<Login />}/>
            
            <Route element={<SidebarOutlet />} >
              
              <Route path="/admin/dashboard" element={<Dashboard />} />  
            
            </Route>
            
      
        </Routes>
        
        {/* All Routes */}


    </div>
  );
}

export default App;
