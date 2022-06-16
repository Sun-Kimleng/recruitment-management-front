import { Fragment, useEffect, useState } from 'react';
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
import Swal from 'sweetalert2';
import { Alert, Snackbar, TextareaAutosize } from '@mui/material';

const Field = dialogTextField;
const Job = () => { 
    //Redux tool kit
    const job = useSelector(getJob);
    const token = useSelector(getAuthToken);
    const dispatch = useDispatch();

    //handle the form
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(['']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [error, setError] = useState(['']);
    const [isPending, setIsPending]=useState(true);
    const [inputs, setInputs] = useState({
      name: '',
      description: '',
    });
    
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

    //handle all inputs from form
    const handleInputs = (e)=>{
      setInputs({...inputs, [e.target.name]: e.target.value});
    }

    //Open Dialog box
    const handleOpen = ()=>{
      setIsOpen(true)
    }
  

    //Close Dialog Box
    const handleClose = ()=>{
      setIsOpen(false);
    }

    //Toggle Update Button
    const handleToggleUpdateBtn= (id, name, description)=>{
      setIsUpdate({update: id});
      setInputs({name: name, description: description});
    }

    //update job
    const handleUpdate= async(id)=>{
 
      const data ={name: inputs.name, description: inputs.description};
      const response = await axios.put(`${ApiKey}/api/user/job/${id}`, data, apiHeadersWithToken(token));

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

    //fetch Job
    const fetchJob = async()=>{

      const $response = await axios.get(`${ApiKey}/api/user/job`, apiHeadersWithToken(token));
      
      if($response.data.status === 200){
        setIsPending(false);
        dispatch(storeJob($response.data.data));
       
      }else{
        console.log('error cannot fetch data');
      }
    }
    //submit new job
    const handleSubmit = async(e)=>{
      e.preventDefault();
      setIsSubmitting(true);
      const data = {name: inputs.name, description: inputs.description};
      const response = await axios.post(`${ApiKey}/api/user/job`,data, apiHeadersWithToken(token));
      if(response.data.status === 404){
        setIsSubmitting(false);
        setError(response.data.errors);
      }else if(response.data.status === 200){
        handleClose();
        setIsSubmitting(false);
        setIsRefresh(!isRefresh);
        Swal.fire(
          'Done!',
          'Succesful added a new job',
          'success'
        )
        setError(['']);
      }else{
        setIsSubmitting(false);
        Swal.fire(
          'We\'re sorry!',
          'You failed to add new job',
          'error'
        )
      }

    }

    //delete Job
    const handleDelete= (id)=>{
      Swal.fire({
        title: 'Do you want to delete this job?',
        showCancelButton: true,
        confirmButtonColor: "#d9534f",
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
       
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.delete(`${ApiKey}/api/user/job/${id}`, apiHeadersWithToken(token))
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
              'Cannot delete this job',
              'warning'
            )
          ]);
        }
      })
    }

    //handle refreshing when new item added
    useEffect(()=>{
      fetchJob()
    }, [isRefresh]);
 

    const body = <form onSubmit={handleSubmit} className='job-form'>
       <FontAwesomeIcon onClick={handleClose} style={{fontSize: '30px', color: 'black', alignItems: 'right', cursor: 'pointer'}} icon={faXmark} />
        <h4 style={{textAlign: 'center'}}>Add Job</h4>
        <Field error={error.name?true:false} helperText={error.name?error.name:''} onChange={handleInputs} value={inputs.name} name='name' className='data-input' label="Job Title" id="custom-css-outlined-input"/>
        <Field error={error.description?true:false} helperText={error.description?error.description:''} onChange={handleInputs} value={inputs.description} name='description' className='data-input' label="Job Description" id="custom-css-outlined-input"/><br />
        <Button className="job-btn" type='submit' variant="primary" disabled={isSubmitting?true:false}>{isSubmitting?'Adding....':'Add Job'}</Button>
    </form>;
    
    return ( 
        <div className="job">
          <br />
          {isPending && <div>Loading........</div>}
        <h2 className="title" style={{textAlign:'center'}}>Manage Jobs</h2>
        <Button variant="primary" onClick={handleOpen}>Add a new job</Button> <br /> <br />
  
        <Table striped bordered hover className='job-table' responsive>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
         
          <tbody>
          {job.map((job, index)=>(
            <tr key={index}>
              {isUpdate.update === job.id
              ?
              //Fragment is mean nothing cause it's not a parent we use it for ?..:..
              <Fragment>
                <td><TextareaAutosize required onChange={handleInputs} type="text" name='name' value={inputs.name} /></td>
                <td><TextareaAutosize required onChange={handleInputs} type="text" name='description' value={inputs.description} /></td>
              </Fragment>
              :
              //Fragment is mean nothing cause it's not a parent we use it for ?..:..
              <Fragment>
                <td>{job.name}</td>
                <td>{job.description}</td>
              </Fragment>
              }
              
              <td>
              {isUpdate.update === job.id
              ?<>
              <Button variant="primary" onClick={()=>handleUpdate(job.id)}>Update</Button>{' '}
              <Button variant="secondary" onClick={()=>setIsUpdate([''])}>Cancel</Button></>
              :<><Button variant="warning" onClick={()=>handleToggleUpdateBtn(job.id, job.name, job.description)}>Edit</Button>{' '}
              
              <Button variant="danger" onClick={()=>handleDelete(job.id)}>Delete</Button>
                </>
              }
              </td>
            </tr>
          ))}
          </tbody>
          
        </Table>
       
        
        {AlertDialogSlide(isOpen, body, handleClose)}

        </div>
    );
    
}
 
export default Job;