import { Outlet } from "react-router-dom";
import CandidateHeader from "./header/candidateHeader";

const CandidateOutlet = () => {
    return ( 
        <>
            <CandidateHeader />
            <Outlet />
        </>
     );
}
 
export default CandidateOutlet;