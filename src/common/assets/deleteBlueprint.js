import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiHeadersWithToken } from "../../api/apiHeaders";
import { ApiKey } from "../../api/apiKey";
import { getAuthToken } from "../../features/adminSlice/adminSlice";

const useDeleteBlueprint = (urlPath, setIsRefresh, isRefresh)=>{
 
    const token = useSelector(getAuthToken);

    const handleDelete= (id)=>{
        Swal.fire({
          title: 'Do you want to delete this?',
          showCancelButton: true,
          confirmButtonColor: "#d9534f",
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel'
         
        }).then((result) => {
          
          if (result.isConfirmed) {
            axios.delete(`${ApiKey}${urlPath}/${id}`, apiHeadersWithToken(token))
            .then(response=>{
              setIsRefresh(!isRefresh);
              Swal.fire(
                'Done!',
                'Succesful Deleted',
                'success'
              )
            }).catch(error=>[
              Swal.fire(
                'Something went wrong!',
                'This item cannot be deleted',
                'warning'
              )
            ]);
          }
        })
      }

    return {handleDelete}
}

export default useDeleteBlueprint;