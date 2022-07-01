import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setAuthtoken } from "../../../features/adminSlice/adminSlice";

const RedirectAfterPwChanged = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setAuthtoken(''));
        setTimeout(() => {
            
            Swal.fire(
                'Your password has been changed',
                'Please login again',
                'success'
              );
                
              navigate('/admin/login', {replace: true});

          }, 2000);
        
            

    }, []);

    return ( 
    <div className="redirect">
        <h2 style={{textAlign: 'center'}}>Logging out.....</h2>
    </div> );
}
 
export default RedirectAfterPwChanged;