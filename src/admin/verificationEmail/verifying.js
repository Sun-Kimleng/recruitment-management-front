import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getVerificationToken, setVerificationToken } from "../../features/adminSlice/adminSlice";



const Verifying = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const verifyToken = useSelector(getVerificationToken);

   

    const [isTrue, setIsTrue]=useState(true);

    useEffect(()=>{
        setTimeout(() => {
            dispatch(setVerificationToken(''));
            Swal.fire(
                'Thank you',
                'Your email has been verified succesfully',
                'success'
              )
          }, 2000);
    }, []);

    
    
   
    return ( 
        <div className="verifying">
            <br />
            <h2 className="header">Verifying your email....</h2>
        </div>
    );
}
 
export default Verifying;