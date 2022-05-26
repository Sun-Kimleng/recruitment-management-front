import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom';
import AdminRegister from './admin/register/admin-register';
import Navbar from './layouts/admin-layouts/header/navbar';
import './App.css'
import Sidebar from './layouts/admin-layouts/sidebar/sidebar';
import Login from './admin/login/login';
import Home from './admin/home/home';
import SidebarOutlet from './layouts/admin-layouts/sidebar/sidebarOutlet';
import Dashboard from './admin/dashboard/dashboard';


function App() {
  return (
    <div className="App">
      
        <Navbar />

        {/* All Routes */}
        <Routes>
          
          <Route path="/" element={<Home />}/>
          <Route path="/admin/register" element={<AdminRegister />}/>
          <Route path="/admin/login" element={<Login />}/>
   
            <Route path='admin'element={<Sidebar />}>
              <Route path="dashboard" element={<Dashboard />} />  
            </Route>
      
  
        </Routes>
        {/* All Routes */}


    </div>
  );
}

export default App;
