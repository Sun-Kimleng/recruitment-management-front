import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiHeadersWithToken } from '../../api/apiHeaders';
import { getfbAvatar, getFbToken, setfbAvatar } from '../../features/candidateSlice/candidateSlice';
import './homePage.css'

const HomePage = () => {
    const fbToken = useSelector(getFbToken);
    const fbAvatar = useSelector(getfbAvatar);

    return ( 
        <div className="home-page">
             
        </div>
    );
}
 
export default HomePage;