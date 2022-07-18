import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { apiHeadersWithToken } from '../../api/apiHeaders';
import { ApiKey } from '../../api/apiKey';

import { getAuthToken } from '../../features/adminSlice/adminSlice';
import AlertDialogUserInfo from './dialogUserInfo';
import './userInfo.css'
import noProfile from './no-pf.jpg'
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UserInfo = ({id, isOpen, setIsOpen, triggerIsOpenById}) => {

    //React Toolkit
    const token = useSelector(getAuthToken);

    //All States
    const [user, setUser] = useState(['']);
    const [isPending, setIsPending] = useState(true);
 
    const handleClose = ()=>{
        setIsOpen(false);
    }   

    const handleFetchUser = async()=>{
        
        if(id == triggerIsOpenById){
            const response = await axios.get(`${ApiKey}/api/user/get_user_by_id/${id}`, apiHeadersWithToken(token));
        
            if(response.data.status === 200){
                setUser(response.data.data[0]);
                setIsPending(false);
            }
        }
    }

    useEffect(()=>{
        handleFetchUser();
    }, []);

    const userInfoProfileStyle = {
        backgroundImage: `url(${user.avatar === null? noProfile:ApiKey+'/'+user.avatar})`,
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    //Body
    const body = (
        <>
        {isPending 
            ?
            <div className='user-info-spinner'>
                <div
                style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <div>
                        <Spinner animation="border"/></div>
                    </div>
                </div>
            :
            <div className='user-info-detail'>
                <div className='user-info-pf'><div style={userInfoProfileStyle}></div></div>
                <div className="user-info-text">
                    <div><b>Username</b><br />{user.username}</div><br />
                    <div><b>User ID</b><br/>{user.user_id}</div><br/>
                    <div><b>Email </b><br />{user.email}</div><br />
                    <div><b>User Created Date</b><br/>{user.created_at.substring(0, 10)}{' '}{user.created_at.substring(11,16)}</div><br />
                    <div><b>User Last Updated</b><br/>{user.updated_at.substring(0, 10)}{' '}{user.updated_at.substring(11,16)}</div><br />
                    <div><b> Email Verification</b><br/>{user.email_verified_at ===null?<div style={{color: 'red'}}><DangerousIcon style={{fontSize: '18px', marginTop:'-3px'}}/> Not Verify</div>:<div style={{color: 'green'}}><CheckCircleIcon style={{fontSize: '18px', marginTop:'-3px'}}/>Verified</div>}</div>
                    <div className='user-info-close-btn'><div><Button variant='danger' size='sm' onClick={handleClose}>Close</Button></div></div>
                </div>
            </div>
        }</>
    );

    
    return (
        <>  
            {id === triggerIsOpenById &&
                <div className="user-info">
                {AlertDialogUserInfo(isOpen, body, handleClose)}    
                </div>
            }
        </> 
     );
}
 
export default UserInfo;