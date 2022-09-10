import { Link, NavLink } from 'react-router-dom';
import './candidateHeader.css'
import agb from './../../admin-layouts/sidebar/AGB.png'
import { FaFacebookSquare } from "react-icons/fa";
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCandidateInformation, getfbAvatar, getFbToken } from '../../../features/candidateSlice/candidateSlice';
import noProfile from './../../admin-layouts/header/no-pf.jpg'
import LogoutIcon from '@mui/icons-material/Logout';

const CandidateHeader = () => {
    //All states
    const fbToken = useSelector(getFbToken);
    const fbAvatar = useSelector(getfbAvatar);
    const candidate = useSelector(getCandidateInformation);

    const [triggerPf, setTriggerPf] = useState(false);

    //facebook
    const [facebookUrl, setFacebookUrl] = useState(null);

     //handle click outside trigger pf button
     const ref = useRef(null);

     useEffect(()=>{
         const handleClickOutside = (e)=>{
             if(ref.current && !ref.current.contains(e.target)){
                 setTriggerPf(false);
             }
         }
             document.addEventListener('mousedown', handleClickOutside);
 
             return ()=>{
                 document.removeEventListener('mousedown', handleClickOutside);
             }
         
     }, [triggerPf]);
    
    //fetching facebook login token
    const fetch = async () =>{
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
    }
    useEffect(()=>{
        fetch();
    },[facebookUrl]);

    const candidate_image_style ={
        backgroundColor: 'gray',
        backgroundImage: `url(${fbAvatar === null ? noProfile : fbAvatar+'&access_token='+fbToken})`,
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
    const profileStyle = {
        backgroundColor: 'gray',
        backgroundImage: `url(${fbAvatar === null ? noProfile : fbAvatar+'&access_token='+fbToken})`,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
 
    }

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

                <div className="candidate-header-right" ref={ref} style={{marginRight: '5px'}}>
                <>{fbToken === ''?
                    <a href={facebookUrl} className='facebook-login'>
                        <FaFacebookSquare style={{fontSize: '20px', margin: '3px 3px 0px 0px', color: 'white'}}/>
                        <div> Login with Facebook</div>
                    </a>
                :<div>
                    <div className='candidate-user-image' onClick={()=>setTriggerPf(!triggerPf)} style={candidate_image_style}></div>
                    {triggerPf && <div className="pf-parent" style={{border: '1px solid #b8b8b8',boxShadow: 'none', height: 'max-content'}}>
                        <Link to={`/user/${candidate.user_id}`} className="pf-child" onClick={()=>setTriggerPf(false)}>
                            <div style={profileStyle} className="pf-picture">
                            </div>
                            <div className="pf-name">
                                <div className="name">Leng Leng</div>
                                <div className="see-profile" style={{color: 'grey'}}>See Your Profile</div>
                            </div>
                        </Link>
                        <hr style={{color: 'grey', marginTop: '8px'}}/>
                        <div className="logout-parent">
                            <div className="logout-child"><div ><LogoutIcon />Logout</div></div>
                        </div>
                    </div>} 
                </div>
                }
                </>
                </div>
            </div>
        </div>
    );
}
 
export default CandidateHeader;