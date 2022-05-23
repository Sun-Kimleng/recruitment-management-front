import logo from './logo.svg';
import {Routes, Route} from 'react-router-dom';
import AdminRegister from './admin/register/admin-register';
import Navbar from './layouts/admin-layouts/header/navbar';
import './App.css'
import Sidebar from './layouts/admin-layouts/sidebar/sidebar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/admin" element={<AdminRegister />}/>
      </Routes>
    </div>
  );
}

export default App;
