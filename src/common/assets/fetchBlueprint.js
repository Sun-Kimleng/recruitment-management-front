import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { apiHeadersWithToken } from "../../api/apiHeaders";
import { ApiKey } from "../../api/apiKey";
import { getAuthToken } from "../../features/adminSlice/adminSlice";

const useFetchBlueprint = (dataStoreFunction, urlPath, setIsPending)=>{
    //temp
    //EX: const urlPath='/api/user/job'
    //Ex: dataStoreFunction = example storeJob(...)

    const token = useSelector(getAuthToken);
    const dispatch = useDispatch();

    //handleFetch
    const handleFetch = async()=>{
        

        const $response = await axios.get(`${ApiKey}${urlPath}`, apiHeadersWithToken(token));
    
        if($response.data.status === 200){
          setIsPending(false);
          dispatch(dataStoreFunction($response.data.data));
     
        }else{
          console.log('error cannot fetch data');
        }
      }

      return {handleFetch}
}

export default useFetchBlueprint;