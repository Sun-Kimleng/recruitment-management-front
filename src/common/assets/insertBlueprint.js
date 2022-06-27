import axios from "axios";
import { useSelector } from "react-redux";
import { apiHeadersWithToken } from "../../api/apiHeaders";
import Swal from "sweetalert2";
import { ApiKey } from "../../api/apiKey";
import { getAuthToken } from "../../features/adminSlice/adminSlice";

const useInsertBlueprint = (
    insertData, 
    urlPath, 
    setIsSubmitting,
    setError, 
    setIsOpen, 
    setIsRefresh,
    isRefresh,
    )=>{

    const token = useSelector(getAuthToken);
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        
        const response = await axios.post(`${ApiKey}${urlPath}`, insertData, apiHeadersWithToken(token));
        if(response.data.status === 404){
          setIsSubmitting(false);
          setError(response.data.errors);
        }else if(response.data.status === 200){
          setIsOpen(false);
          setIsSubmitting(false);
          setIsRefresh(!isRefresh);
          Swal.fire(
            'Done!',
            'Succesful added',
            'success'
          )
          setError(['']);
        }else{
          setIsSubmitting(false);
          Swal.fire(
            'We\'re sorry!',
            'You failed to add this item',
            'error'
          )
        }
      }
  

    return {handleSubmit}
}

export default useInsertBlueprint;