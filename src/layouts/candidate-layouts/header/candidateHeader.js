import { NavLink } from 'react-router-dom';
import './candidateHeader.css'
import agb from './../../admin-layouts/sidebar/AGB.png'

const CandidateHeader = () => {
    return ( 
        <div className="candidate-header">
            <div className="candidate-header-container">
                <div className="candidate-header-left">
                <><NavLink to='/' className='item'><><img src={agb} style={{width: '120px'}}/></></NavLink></>
                </div>
        
                <div className="candidate-header-center">
                <><NavLink to='/service' className='item'><>Service</></NavLink></>
                <><NavLink to='/about' className='item'><>About</></NavLink></>
                <><NavLink to='/contact' className='item'><>Contact</></NavLink></>
                <><NavLink to='/help' className='item'><>Help</></NavLink></>
                </div>

                <div className="candidate-header-right" style={{marginRight: '5px'}}>
                <><NavLink to='signup' className='item'><>Sign Up</></NavLink></>
                <><NavLink to='login' className='item'><>Login</></NavLink></>
                
                </div>
            </div>
        </div>
    );
}
 
export default CandidateHeader;