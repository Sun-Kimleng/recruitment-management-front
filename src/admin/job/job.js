import { Fragment, useEffect, useMemo, useState } from 'react';
import { Button, Form, FormControl, Table } from 'react-bootstrap';
import AlertDialogSlide from '../../common/material/DialogBox';
import { dialogTextField } from '../../common/material/dialogTextField';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux'
import './job.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getJob, storeJob } from '../../features/jobSlice/jobSlice';
import axios from 'axios';
import { ApiKey } from '../../api/apiKey';
import { apiHeadersWithToken } from '../../api/apiHeaders';
import { getAuthToken } from '../../features/adminSlice/adminSlice';
import Swal from 'sweetalert2';
import {Pagination, TextareaAutosize } from '@mui/material';
import usePaginateBluePrint from '../../common/material/paginate';
import {AnimatePresence, motion} from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { jobDetail } from './jobDetail';


const Field = dialogTextField;

const Job = () => { 
    //Redux tool kit
    const job = useSelector(getJob);
    const token = useSelector(getAuthToken);
    const dispatch = useDispatch();

    //handle the form
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(['']);
    const [isOpenDetailTable, setIsOpenDetailTable] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [error, setError] = useState(['']);
    const [isPending, setIsPending]=useState(true);
    const [checkItems, setCheckItems]=useState([]);
    const [inputs, setInputs] = useState({
      name: '',
      description: '',
    });
    
    //Animation toggle detail
    const toggleTableVariant = {
      show: {
        height: '200px'
        
      },
      hide: {
        
        height: '0px'
      },

      close: {
        overflow: 'hidden',
        height: '0px'
      },

      invisible: {
          display: 'none',
        
      }
    }

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

    //Toggle Detail Table Row
    const handleToggleTable = (id)=>{

      if(isOpenDetailTable.open === id){
        setIsOpenDetailTable(['']);

      }else{
        setIsOpenDetailTable({open: id});
      }
    
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

    //Submit new job
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

    //Delete Job
    const handleDelete= (id)=>{
      Swal.fire({
        title: 'Do you want to delete this job?',
        showCancelButton: true,
        confirmButtonColor: "#d9534f",
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
       
      }).then((result) => {
        
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

    //Handle refreshing when new item added or changing
    useEffect(()=>{
      fetchJob()
    }, [isRefresh]);
    
    //Sorting
    const [select, setSelect]=useState('name');
    const [order, setOrder] = useState('asc');

    const sorting = (column)=>{
        switch (column){
            case 'name':
            setSelect('name'); break;

            case 'description':
            setSelect('description'); break;

            default:
            setSelect('name');
        }

        if(order === 'asc')
        {
            //..data whatever inside array
            const sorted = [...job].sort((a, b)=>
            {
                return a[column].toLowerCase() > b[column].toLowerCase()? 1 : -1
            }
            );
                dispatch(storeJob(sorted));
                setOrder('dsc');
               
        }
        if(order ==='dsc'){

            //..data whatever inside array
            const sorted = [...job].sort((a, b)=>
            {
                return a[column].toLowerCase() < b[column].toLowerCase() ? 1 : -1
            }
            );
  
                dispatch(storeJob(sorted));
                setOrder('asc');
        }
    }

    //Searching
    const [searchTerm, setSearchTerm]= useState('');

    let currentJob;

    useMemo(()=>{
        currentJob= job.filter((job)=>{
            if(searchTerm ===''){
                return job;
            }
            //value is what we maping through filter
            else if(job.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return job;
            }
        }
    )});

    //Pagination
    const {currentPost: data, totalPage, currentPage, changePage}= usePaginateBluePrint(currentJob);

    //Submit Form Adding New Job
    const body = <form onSubmit={handleSubmit} className='job-form'>
       <FontAwesomeIcon onClick={handleClose} style={{fontSize: '30px', color: 'black', alignItems: 'right', cursor: 'pointer'}} icon={faXmark} />
        <h4 style={{textAlign: 'center'}}>Add Job</h4>
        <Field error={error.name?true:false} helperText={error.name?error.name:''} onChange={handleInputs} value={inputs.name} name='name' className='data-input' label="Job Title" id="custom-css-outlined-input"/>
        <Field error={error.description?true:false} helperText={error.description?error.description:''} onChange={handleInputs} value={inputs.description} name='description' className='data-input' label="Job Description" id="custom-css-outlined-input"/><br />
        <Button className="job-btn" type='submit' variant="primary" disabled={isSubmitting?true:false}>{isSubmitting?'Adding....':'Add Job'}</Button>
    </form>;
    
    //Handle Checked Items to delete
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
  
    const handleSelectAll = (e) => {
      setIsCheckAll(!isCheckAll);
      setIsCheck(currentJob.map(data => data.id));
      if (isCheckAll) {
        setIsCheck([]);
      }
    };

    const handleSelectByID = (e) => {
      
      setIsCheckAll(false);

      setIsCheck([...isCheck, parseInt(e.target.id)]);
      if (!e.target.checked) {
        //select only item that doesn't equal to e.target.id
        setIsCheck(isCheck.filter(item => item != e.target.id));
      }
    };

    //Handle Delete by checked items
    const handleDeleteByCheckedItems = async(ids)=>{

      Swal.fire({
        title: 'Do you want to delete these selected rows?',
        showCancelButton: true,
        confirmButtonColor: "#d9534f",
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
       
      }).then((result) => {
        
        if (result.isConfirmed) {
          axios.delete(`${ApiKey}/api/user/job/deleteAll/${ids}`, apiHeadersWithToken(token))
          .then(response=>{
            setIsRefresh(!isRefresh);
            setIsCheck([]);
            Swal.fire(
              'Done!',
              'Succesful Deleted',
              'success'
            )
          }).catch(error=>[
            Swal.fire(
              'Something went wrong!',
              'Cannot delete these rows',
              'warning'
            )
          ]);
        }
      })
    }
    
    const handleExitSelectedRow = ()=>{
      setIsCheckAll(false);
      setIsCheck([]);
    }
    console.log(isCheck);

    //TEMPLATES IS HERE!!!
    return ( 
        <div className="job">
          <br /><br />

          {isPending && <div>Loading........</div>}
        <h2 className="title" style={{textAlign:'center'}}>Manage Jobs</h2>
        <div className='head-item'>
        <><Button variant="primary" onClick={handleOpen}>Add a new job</Button></>
        <><FormControl
                type="search"
                placeholder="Search by Job title"
                className="me-2 search"
                aria-label="Search"
                onChange={(e)=>{setSearchTerm(e.target.value)}}
        /></></div>
     
  
        <Table className='job-table' responsive>
          <thead>
            <tr>
              {/* handle Select all */}
              <th className="check-item"><Form.Check
                
                type="checkbox"
                id="selectAll"
                onChange={handleSelectAll}
                checked={isCheckAll?true:false}
              />
              </th>
              <th style={{cursor: 'pointer'}} className={select === 'name'?'is-active':''} onClick={()=>{sorting('name')}}>Job Title</th>
              <th style={{cursor: 'pointer'}} className={select === 'description'?'is-active':''} onClick={()=>{sorting('description')}}>Description</th>
              <th>Action</th>
            </tr>
          </thead>
         
          <tbody>
          {data.map((job, index)=>(
             <Fragment key={index}>
            <tr style={{cursor: 'pointer'}} className="check-item">
              {/* handle Select by id */}
              <th><Form.Check
                key={job.id}
                type="checkbox"
                id={job.id}
                onChange={handleSelectByID}
                //check if in isCheck array has id of that row
                checked={isCheck.includes(job.id)?true :false}
                
              />
              </th>
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
                <td onClick={()=>handleToggleTable(job.id)}>{job.name} </td>
                <td onClick={()=>handleToggleTable(job.id)}>{job.description.length<20?job.description:job.description
                .substring(0,19)+'....'}</td>
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
              <AnimatePresence>
                {isOpenDetailTable.open === job.id 
                &&(
                  <Fragment>
                  
                    <motion.tr
                      variants={toggleTableVariant}
                      animate= 'show'
                      initial= 'hide'
                      exit='close'

                    >
                      <motion.td colSpan={4}
                      variants={toggleTableVariant}
                      exit='invisible'
                      style={{backgroundColor: '#f0f0f0'}}
                      >
                        {jobDetail(job.created_at, job.updated_at, job.description)}
                      </motion.td>
                    </motion.tr>
                    
                  </Fragment>
                )}
              </AnimatePresence>
            </Fragment>
            
          ))}
          </tbody>
          
        </Table>
        <Pagination count={totalPage} page={currentPage} onChange={(e, value)=>{changePage(value)}} variant="outlined" shape="rounded"/>
        
        {isCheck.length !== 0 &&<div className="selected-all-alert">
          <div className="selected-row"><div className="text">{isCheck.length} Rows selected</div></div>
          <div className="btn-delete-selected"><Button onClick={()=>handleDeleteByCheckedItems(isCheck+',')} variant="outline-danger" style={{height:'30px', margin: '5px 10px 0px 10px', padding: '0px 10px' , borderColor:'white' ,color:'white'}}>Delete selected items</Button>{' '}</div>
          <div className="exit-selected"><CloseIcon onClick={handleExitSelectedRow} style={{fontWeight: '500' ,fontSize: '20px', margin: '11px 20px 0px 10px',color: 'white', alignItems: 'right', cursor: 'pointer'}} icon={faXmark}/></div>
        </div>}
        {AlertDialogSlide(isOpen, body, handleClose)}
        </div>
    );
    
}
 
export default Job;