import { Fragment, useEffect, useMemo, useState } from 'react';
import { Button, Form, FormControl, Spinner, Table } from 'react-bootstrap';
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
import { getAuthToken, setTriggerLeftBarFalse } from '../../features/adminSlice/adminSlice';
import Swal from 'sweetalert2';
import {Pagination, TextareaAutosize } from '@mui/material';
import usePaginateBluePrint from '../../common/material/paginate';
import {AnimatePresence, motion} from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { jobDetail } from './jobDetail';
import useFetchBlueprint from '../../common/assets/fetchBlueprint';
import useDeleteBlueprint from '../../common/assets/deleteBlueprint';
import useUpdateBlueprint from '../../common/assets/updateBlueprint';
import useInsertBlueprint from '../../common/assets/insertBlueprint';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { SetPageTitle } from '../../setPageTitle';

const Field = dialogTextField;


const Job = () => { 

    //Redux tool kit
    const job = useSelector(getJob);
    const token = useSelector(getAuthToken);
    const dispatch = useDispatch();

    //All the materials
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(['']);
    const [isOpenDetailTable, setIsOpenDetailTable] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [error, setError] = useState(['']);
    const [isPending, setIsPending]=useState(true);
    const [inputs, setInputs] = useState({
      name: '',
      description: '',
    });
    
    //fetch Job
    const {handleFetch} = useFetchBlueprint
    (storeJob, '/api/user/job', setIsPending);

    //Delete Job
    const {handleDelete}=useDeleteBlueprint
    ('/api/user/job', setIsRefresh, isRefresh);

    //update job
    const updateData ={name: inputs.name, description: inputs.description};
    const{handleUpdate} = useUpdateBlueprint
    (updateData, '/api/user/job', setIsRefresh, isRefresh, setIsUpdate);

    //Insert Job
    const insertData = {name: inputs.name, description: inputs.description};
    const {handleSubmit} = useInsertBlueprint
    (
      insertData, 
      '/api/user/job', 
      setIsSubmitting,
      setError, 
      setIsOpen, 
      setIsRefresh,
      isRefresh,
    );

    //Handle refreshing when new item added or changing
    useEffect(()=>{
      handleFetch();
      //Set Page Title
      SetPageTitle('Job Management');
      dispatch(setTriggerLeftBarFalse(true));
    }, [isRefresh]);

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
    
    //Sorting
    const [select, setSelect] = useState('');
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
        currentJob = job.filter((job)=>{
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
    const {currentPost: data, totalPage, currentPage, changePage}= usePaginateBluePrint(currentJob, searchTerm);

    //Submit Form Adding New Job
    const body = <form onSubmit={handleSubmit} className='job-form'>
       <FontAwesomeIcon onClick={handleClose} style={{fontSize: '30px', color: 'black', alignItems: 'right', cursor: 'pointer'}} icon={faXmark} />
        <h4 style={{textAlign: 'center'}}>Add Job</h4>
        <Field error={error.name?true:false} helperText={error.name?error.name:''} onChange={handleInputs} value={inputs.name} name='name' className='data-input-job' label="Job Title" id="custom-css-outlined-input"/>
        <Field error={error.description?true:false} helperText={error.description?error.description:''} onChange={handleInputs} value={inputs.description} name='description' className='data-input-job' label="Job Description" id="custom-css-outlined-input"/><br />
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

    //TEMPLATES IS HERE!!!
    
    return (

        <div className="job">
          <br /><br />
        <div className='head'>
          {' '}<h1 className="title" style={{textAlign:'center'}}>Manage Jobs</h1>
          <div className="adding-btn"><Button variant="primary" style={{width: '200px'}} onClick={handleOpen}>Add a new job</Button></div>
        </div>
        <br />
        <div className='head-item'>
       
            <><FormControl
                type="search"
                placeholder="Filter by job title"
                className="me-2 search"
                aria-label="Search"
                onChange={(e)=>{setSearchTerm(e.target.value)}}
        /></></div>

  
        {isPending? 
          <div
          style={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
          }} 
      ><div><Spinner animation="border"/></div></div>
        :<Table className='job-table' responsive>
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
              <th className='arrow-column'></th>
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
                <td className='arrow-column'>{isOpenDetailTable.open !== job.id?<ArrowRightIcon/>:<ArrowDropDownIcon />}</td>
                <td><TextareaAutosize required onChange={handleInputs} type="text" name='name' value={inputs.name} /></td>
                <td><TextareaAutosize required onChange={handleInputs} type="text" name='description' value={inputs.description} /></td>
              </Fragment>
              :
              //Fragment is mean nothing cause it's not a parent we use it for ?..:..
              <Fragment>
                <td onClick={()=>handleToggleTable(job.id)} className='arrow-column'>{isOpenDetailTable.open !== job.id?<ArrowRightIcon/>:<ArrowDropDownIcon />}</td>
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
                      <motion.td colSpan={5}
                      variants={toggleTableVariant}
                      exit='invisible'
                      style={{backgroundColor: '#f0f0f0'}}
                      >
                        {jobDetail(job.created_at, job.updated_at, job.description, job.user_added)}
                      </motion.td>
                    </motion.tr>
                    
                  </Fragment>
                )}
              </AnimatePresence>
            </Fragment>
            
          ))}
          </tbody>
          
        </Table>}
        <br />

        <p>Total Record: {currentJob.length}</p>
    
        <Pagination className='dialog-relative' count={totalPage} page={currentPage} onChange={(e, value)=>{changePage(value)}} variant="outlined" shape="rounded"/>
        
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