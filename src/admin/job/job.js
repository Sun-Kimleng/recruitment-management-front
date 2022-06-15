import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import AlertDialogSlide from '../../common/material/DialogBox';
import { dialogTextField } from '../../common/material/dialogTextField';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux'
import './job.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getJob, storeJob } from '../../features/jobSlice/jobSlice';
import axios from 'axios';
import { ApiKey } from '../../api/apiKey';
import { apiHeadersWithToken } from '../../api/apiHeaders';
import { getAuthToken } from '../../features/adminSlice/adminSlice';

const Field = dialogTextField;
const Job = () => {

    const job = useSelector(getJob);
    const token = useSelector(getAuthToken);
    
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(true);
    
    const handleClose = ()=>{
        setIsOpen(false)
    }

    const fetchJob = async()=>{

      const $response = await axios.get(`${ApiKey}/api/user/job`, apiHeadersWithToken(token));
      
      if($response.data.status === 200){
        dispatch(storeJob($response.data.data));
       
      }else{
        console.log('error cannot fetch data');
      }
    }

    useEffect(()=>{
      fetchJob()
      console.log(job);
    }, []);

    const handleOpen = ()=>{
        setIsOpen(true)
    }

    const body = <form className='job-form'>
       <FontAwesomeIcon onClick={handleClose} style={{fontSize: '30px', color: 'black', alignItems: 'right', cursor: 'pointer'}} icon={faXmark} />
        <h4 style={{textAlign: 'center'}}>Add Job</h4>
        <Field className='data-input' label="Job Title" id="custom-css-outlined-input"/>
        <Field className='data-input' label="Job Description" id="custom-css-outlined-input"/><br />
        <Button className="job-btn" type='submit' variant="primary">Add job</Button>


    </form>;

    return ( 
        <div className="job">
        <button onClick={handleOpen}>Open</button>
        <Table striped bordered hover className='job-table' responsive>
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
         
          <tbody>
          {job.map((job, index)=>(
            <tr key={index}>
              <td>{job.name}</td>
              <td>{job.description}</td>
              <td></td>
            </tr>
          ))}
          </tbody>
          
        </Table>

{AlertDialogSlide(isOpen, body, handleClose)}
        </div>
    );
    
}
 
export default Job;