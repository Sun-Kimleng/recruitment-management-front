import { useSelector } from "react-redux"
import { getAuthToken } from "../features/adminSlice/adminSlice"



export const apiHeaders= {
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    }}

export const apiHeadersWithToken = (token)=>{
    return {
        headers:{
            'content-type': 'application/json',
            'accept': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }
}

const Head = () => {    

    return ( <div className="head">

    </div> );
}
 
export default Head;