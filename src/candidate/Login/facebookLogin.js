import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getFbToken, setCandidateAuth, setCandidateInformation, setfbAvatar, setFbToken } from '../../features/candidateSlice/candidateSlice';
import { Spinner } from 'react-bootstrap';
import { ApiKey } from '../../api/apiKey';
import { apiHeadersWithToken } from '../../api/apiHeaders';

const FacebookLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginViaFacebook = async()=>{
        const config = {
            headers:{
                'accept': 'application/json',
            }
        }
        
        await axios.get(`${ApiKey}/api/login/facebook/callback${window.location.search}`, config)
        .then(response=>{
            navigate('/candidate_info');
            dispatch(setFbToken(response.data.information.token));
            dispatch(setCandidateAuth(response.data.token));
            dispatch(setfbAvatar(response.data.information.avatar_original));
            dispatch(setCandidateInformation(response.data.data));
            console.log(response.data.token)
        }).catch(error=>{
        
        });
    }

    useEffect(()=>{
        loginViaFacebook()
    },[]);

    return ( 
        <div>
            <div
                style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }} 
            ><div><Spinner animation="border"/></div></div>
        </div>
    );
}
 
export default FacebookLogin;