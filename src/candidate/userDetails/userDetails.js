import './userDetails.css';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getCandidateAuth, getfbAvatar, getFbToken } from '../../features/candidateSlice/candidateSlice';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Skeleton from '@mui/material/Skeleton';
import { dialogTextField } from '../../common/material/dialogTextField';
import ButtonM from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { ApiKey } from '../../api/apiKey';
import { apiHeadersWithToken } from '../../api/apiHeaders';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import AlertDialogSlide from '../../common/material/DialogBox';
import Swal from 'sweetalert2';
import { currentYear } from './years';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
const Field = dialogTextField;

const UserDetails = () => {
    const navigate = useNavigate();

    //Redux Toolkit
    const fbAvatar = useSelector(getfbAvatar);
    const fbToken = useSelector(getFbToken);
    const token = useSelector(getCandidateAuth);
    
    //date
    const myYear = new Date();

    //All State
    const [isRefresh, setIsRefresh]= useState(false);
    const [data, setData] = useState('');
    const [isDataPending, setIsDataPending] = useState(true);
    const [isOpenEducations, setIsOpenEducations] = useState(false);

    //PF Style
    const pfStyle = {
        backgroundColor: 'gray',
        backgroundImage: `url(${fbAvatar+'&access_token='+fbToken}`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

    }
    const [errors, setErros] = useState('');
    const [inputs, setInputs] = useState({
        educationsName: '',
        educationsFrom: '',
        educationsTo: '',
    });

    //handle any inputs
    const handleInputs = (e)=>{
        return setInputs({...inputs, [e.target.name]:e.target.value})
    }

    //fetch data

    const fetchAllData = async()=>{
        
        const response = await axios.get(`${ApiKey}/api/candidate`, apiHeadersWithToken(token));

        if(response.data.status == 200){
            setIsDataPending(false);
            setData(response.data.candidate);
        }

        if(response.data.status == 404){
            navigate('/candidate_info');
        }
    }   

    //Educations - Popup

    const [educationsErros, setEducationsError]= useState('');

    const handleCloseEducation = ()=>{
        setIsOpenEducations(false);
    }

    const handleSubmitEducationPopUp = async(e)=>{
        e.preventDefault();
        const newData = {name: inputs.educationsName, year: inputs.educationsFrom+' - '+inputs.educationsTo};
        const oldData = data.educations;
        oldData.push(newData);

        const currentData = {educations: oldData}
        if(inputs.educationsName != ''){
            const response = await axios.post(`${ApiKey}/api/candidate/insert_education`,currentData, apiHeadersWithToken(token))
        
        if(response.data.status = 200){
            Swal.fire(
                'Done!',
                'Added Succesful',
                'success'
              )

            setIsOpenEducations(false)
            setIsRefresh(!isRefresh)
        }else{
            
            }
        }else{
           
        }
    };
    const bodyEducations = <form onSubmit={handleSubmitEducationPopUp} className='users-details-education-pop'>
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>Enter school or college name</p>
        <Field error={''} helperText={''} variant="standard" type="text" name="educationsName" value={inputs.educationsName} onChange={handleInputs} className='pf-detail-input' label="School or college name" size="small" />< br/><br/>

        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                From
            </InputLabel>
            <NativeSelect
                error={''}
                size='small'
                value={inputs.educationsFrom}
                name="educationsFrom"
                label="From"
                defaultValue={myYear.getFullYear()}
                onChange={handleInputs}>
                <option value={myYear.getFullYear()}>{myYear.getFullYear()}</option>
                {currentYear.map ((year, index)=>(
                <option key={index} value={year}>{year}</option> 
                ))}  
            </NativeSelect>
        </FormControl><br /><br />
        
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                To
            </InputLabel>
            <NativeSelect
                error={''}
                size='small'
                value={inputs.educationsTo}
                name="educationsTo"
                label="To"
                defaultValue={myYear.getFullYear()}
                onChange={handleInputs}>
                <option value={myYear.getFullYear()}>{myYear.getFullYear()}</option>
                {currentYear.map ((year, index)=>(
                <option key={index} value={year}>{year}</option> 
                ))}  
            </NativeSelect>
        </FormControl><br /><br />
        
        <ButtonM variant="contained" type="submit" style={{width: '100%'}}>Submit</ButtonM>
    </form>;

    //Refresh
    useState(()=>{
        fetchAllData();
    }, [isRefresh]);

    //TEMPLATES IS HERE !!!!!!!!!!!!!!!
    if(isDataPending){
        return(
            <div>
                <div
                style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }} 
                ><div><Spinner animation="border"/></div></div>
            </div>
        )
    }else{
        return ( 
            <div className='user-details'><br/>
                {/* Overview */}
                <section className="user-details-container">
                    <section className="user-details-section-top">
                    
                        <div className="user-details-cover">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" 
                            style={{transform: 'rotate(180deg)', position: 'absolute', top: 0}}>
                            <path fill="#4267b2" fillOpacity="1" d="M0,96L80,117.3C160,139,320,181,480,176C640,171,800,117,960,122.7C1120,128,1280,192,1360,224L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                        </svg>
                            <div className="user-details-pf" style={pfStyle}></div>
                            <Skeleton variant="circular" width={40} height={40} />
                        </div>
                    </section>

                    <section className="user-details-section-middle">
                        <section className="user-details-info" style={{position: 'relative'}}>
                            <h4>{data.name}</h4>
                            {data.school != '' ?<p>Student at {data.school}</p>:''}
                            {data.workplace != ''?<p>Working at {data.workplace}</p>:''}
                            <p>{data.city}, Cambodia</p>
                            <div style={{
                                cursor: 'pointer', position: 'absolute',
                                top: 0, right: '20px'
                            }} 
                            className="user-details-edit-icon">
                                    <EditIcon />
                            </div>
                        </section>
                        <Button variant="success">{data.job_status} for work</Button>{' '}<br /><br /><br/>

                        <section className="user-details-role">
                            <div className='user-details-box-sections'>
                                <div>
                                    <p>APPLY ROLE</p>
                                    <p style={{fontWeight: 'bold'}}>{data.interested_job}</p><br />
                                    <p>LEVEL</p>
                                    <p style={{fontWeight: 'bold'}}>{data.job_level}</p>
                                </div>
                                <div style={{cursor: 'pointer'}} className="user-details-edit-icon">
                                    <EditIcon />
                                </div>
                            </div>
                            
                        </section>
                    </section>

                </section><br />

                {/* Appearance */}
                <section className="user-details-container">
                    <section className="user-details-info-sections">
                        <section className='user-details-info-item'>
                            {/* Toggle + title */}
                            <div className='user-details-info-item-toggle'>
                                <h5>Appearance</h5>
                                <div className="user-details-icon-container">
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {/* item details */}
                            <div className='user-details-info'>
                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>Gender</p>
                                        <p style={{marginTop: '-15px'}}>{data.gender}</p>
                                    </div>
                                </div>

                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>Date of birth</p>
                                        <p style={{marginTop: '-15px'}}>{data.birthday.substring(0, 10)}</p>
                                    </div>
                                </div>

                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>Height</p>
                                        <p style={{marginTop: '-15px'}}>{data.height}</p>
                                    </div>
                                </div>

                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>Weight</p>
                                        <p style={{marginTop: '-15px'}}>{data.height}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </section><br />

                {/* Contact */}
                <section className="user-details-container">
                    <section className="user-details-info-sections">
                        <section className='user-details-info-item'>
                            {/* Toggle + title */}
                            <div className='user-details-info-item-toggle'>
                                <h5>Contact</h5>
                                <div className="user-details-icon-container">
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <AddIcon />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {/* item details */}
                            <div className='user-details-info'>
                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>Phone(+855)</p>
                                        <p style={{marginTop: '-15px'}}>{data.phone}</p>
                                    </div>
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>

                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>Email</p>
                                        <p style={{marginTop: '-15px'}}>{data.email}</p>
                                    </div>
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>


                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>Address</p>
                                        <p style={{marginTop: '-15px'}}>
                                            {data.address}
                                        </p>
                                    </div>
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </section><br />
                
                {/* Languages */}
                <section className="user-details-container">
                    <section className="user-details-info-sections">
                        <section className='user-details-info-item'>
                            {/* Toggle + title */}
                            <div className='user-details-info-item-toggle'>
                                <h5>Description</h5>
                                <div className="user-details-icon-container">
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {/* item details */}
                            <div className='user-details-info'>
                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        {parse(data.description)}
                                    </div>
                                </div>


                            </div>
                        </section>
                    </section>
                </section><br />

                {/* Education */}
                <section className="user-details-container">
                    <section className="user-details-info-sections">
                        <section className='user-details-info-item'>
                            {/* Toggle + title */}
                            <div className='user-details-info-item-toggle'>
                                <h5>Education</h5>
                                <div className="user-details-icon-container">
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <AddIcon onClick={()=>setIsOpenEducations(true)}/>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {/* item details */}
                            { data.educations.length != 0?<>
                            {data.educations.map((education, index)=>(<div className='user-details-info'>
                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>{education.name}</p>
                                        <p style={{marginTop: '-15px'}}>{education.year}</p>
                                    </div>
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>
                            </div>
                            ))}</>:
                            <div className='item' style={{padding: '5px 10px'}}>
                            <div>
                                <p>No Data</p>
                            </div>
                        </div>
                            }
                        </section>
                    </section>
                </section>

                {/* Skills */}
                <section className="user-details-container">
                    <section className="user-details-info-sections">
                        <section className='user-details-info-item'>
                            {/* Toggle + title */}
                            <div className='user-details-info-item-toggle'>
                                <h5>Skills</h5>
                                <div className="user-details-icon-container">
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <AddIcon />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {/* item details */}
                            <div className='user-details-info'>
                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>HTML</p>
                                        <p style={{marginTop: '-15px'}}>80%</p>
                                    </div>
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>

                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>CSS</p>
                                        <p style={{marginTop: '-15px'}}>80%</p>
                                    </div>
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </section><br />

                {/* Experiences */}
                <section className="user-details-container">
                    <section className="user-details-info-sections">
                        <section className='user-details-info-item'>
                            {/* Toggle + title */}
                            <div className='user-details-info-item-toggle'>
                                <h5>Experiences</h5>
                                <div className="user-details-icon-container">
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <AddIcon />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {/* item details */}
                            <div className='user-details-info'>
                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>ACB Co Ltd.</p>
                                        <p style={{marginTop: '-15px'}}>2018 - 2020</p>
                                    </div>
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>

                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>National Company</p>
                                        <p style={{marginTop: '-15px'}}>2020-2022</p>
                                    </div>
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </section><br />

                {/* Languages */}
                <section className="user-details-container">
                    <section className="user-details-info-sections">
                        <section className='user-details-info-item'>
                            {/* Toggle + title */}
                            <div className='user-details-info-item-toggle'>
                                <h5>Languages</h5>
                                <div className="user-details-icon-container">
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <AddIcon />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {/* item details */}
                            <div className='user-details-info'>
                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>Native</p>
                                        <p style={{marginTop: '-15px'}}>Fluent</p>
                                    </div>
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>

                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold'}}>English</p>
                                        <p style={{marginTop: '-15px'}}>Intemediate</p>
                                    </div>
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </section><br />

                {/* CV File */}
                <section className="user-details-container">
                    <section className="user-details-info-sections">
                        <section className='user-details-info-item'>
                            {/* Toggle + title */}
                            <div className='user-details-info-item-toggle'>
                                <h5>CV File</h5>
                                <div className="user-details-icon-container">
                                    <div style={{cursor: 'pointer', marginRight: '20px'}} className="user-details-edit-icon">
                                        <EditIcon />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            {/* item details */}
                            <div className='user-details-info'>
                                {/* Item */}
                                <div className='item' style={{padding: '5px 10px'}}>
                                    <div>
                                        <p style={{fontWeight: 'bold', height: '60px'}}>
                                            Click This Below Button To View CV
                                        </p>
                                        <p style={{marginTop: '-45px'}}>
                                            <ButtonM variant="contained"><a href="" style={{textDecoration: 'none', color: 'white'}}>
                                                View CV</a>
                                            </ButtonM>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </section>

                {/* Educations - popup form */}
                {AlertDialogSlide(isOpenEducations, bodyEducations, handleCloseEducation)}
            </div> 
        );

       
                            
    }
}
 
export default UserDetails;