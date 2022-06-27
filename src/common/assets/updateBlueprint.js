import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { apiHeadersWithToken } from "../../api/apiHeaders";
import Swal from "sweetalert2";
import { ApiKey } from "../../api/apiKey";
import { getAuthToken } from "../../features/adminSlice/adminSlice";

const useUpdateBlueprint = (updateData, urlPath, setIsRefresh, isRefresh, setIsUpdate)=>{

    
    const token = useSelector(getAuthToken);
     //Sweet alert Toast
        const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    const handleUpdate= async(id)=>{
        
        const response = await axios.put(`${ApiKey}${urlPath}/${id}`, updateData, apiHeadersWithToken(token));
  
        if(response.data.status === 200){
            setIsUpdate(['']);
            setIsRefresh(!isRefresh);
            Toast.fire({
              icon: 'success',
              title: 'Updated Succesful!'
            })
        }else{
          Toast.fire({
            icon: 'error',
            title: 'Something went wrong! please check!'
          })
        }
      }

    return {handleUpdate}
}

export default useUpdateBlueprint;