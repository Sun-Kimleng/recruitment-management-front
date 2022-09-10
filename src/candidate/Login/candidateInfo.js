import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState, useRef} from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiHeadersWithToken } from '../../api/apiHeaders';
import { ApiKey } from '../../api/apiKey';
import { dialogTextField } from '../../common/material/dialogTextField';
import { getCandidateAuth, getCandidateInformation } from '../../features/candidateSlice/candidateSlice';
import './candidateInfo.css';
import { Editor } from '@tinymce/tinymce-react';
import { Picklist, PicklistOption, DatePicker } from 'react-rainbow-components';

const Field = dialogTextField;

const CandidateInfo = () => {
    //Redux Toolkit
    const token = useSelector(getCandidateAuth);
    const user= useSelector(getCandidateInformation);
    const navigate = useNavigate();

    //All States
    const editorRef = useRef(null);
    const [isPending, setIsPending] = useState(true);
    const [isRefresh, setIsRefresh] = useState(false);
    const [inputs, setInputs]= useState([{
        name: '',
        city: '',
        gender: '',
        birthday: '',
        phone: '',
        address: '',
        interestedJob: '',
        jobLevel: '',
        description: '',
    }]);

    const [errors, setErrors] = useState('');

    //All Functions
    const log = () => {
        if (editorRef.current) {
          console.log(editorRef.current.getContent());
        }
      };

    const fetchCandidate = async() =>{
        
        const response = await axios.get(`${ApiKey}/api/candidate`, apiHeadersWithToken(token));

        if(response.data.status == 200){
            navigate('/')
        }
        if(response.data.status == 404){
            setIsPending(false);
        }
    }

    const handleSubmitCandidateInfo = async (e) =>{
        e.preventDefault();

        const data = {name: inputs.name, city: inputs.city, gender: inputs.gender, birthday: inputs.birthday, phone: inputs.phone, address: inputs.address, interestedJob: inputs.interestedJob, jobLevel: inputs.jobLevel, description: inputs.description};

        const response = await axios.post(`${ApiKey}/api/candidate`, data, apiHeadersWithToken(token));

        if(response.data.status == 200){
            navigate(`/user/${user.user_id}`);
        }else{
            setErrors(response.data.errors);
        }

    }

    const handleInputs = (e)=>{
        return setInputs({...inputs, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        fetchCandidate();
    }, [isRefresh]);

    if(isPending){
        return ( 
            <div className="candidate-info">
                <div
                    style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }} 
                ><div><Spinner animation="border"/></div></div>
            </div>
        );
    }else{
        return ( 
            <div className="candidate-info"><br/>
                <h5 className='candidate-info-title'>BEFORE YOU GO, WE NEED SOME REQUIREMENT INFORMATION FROM YOU</h5>
            
                <form className='candidate-info-form' onSubmit={handleSubmitCandidateInfo}>
                <Field error={errors.name?true:false} helperText={errors.name?errors.name:''} type="text" name="name" value={inputs.name} onChange={handleInputs} className='pf-detail-input' label="Enter your name" variant="outlined" size="small" />< br/><br/>
                <FormControl fullWidth>
                <InputLabel size="small" error={errors.city?true:false} id="demo-simple-select-label">City/Province</InputLabel>
                <Select
                    error={errors.city?true:false}
                    size='small'
                    value={inputs.city}
                    name="city"
                    label="City/Province"
                    onChange={handleInputs}>
                    <MenuItem value='Banteay Meanchey'>Banteay Meanchey</MenuItem> 
                    <MenuItem value='Battambang'>Battambang</MenuItem> 
                    <MenuItem value='Kampong Cham'>Kampong Cham</MenuItem> 
                    <MenuItem value='Kampong Chhnang'>Kampong Chhnang</MenuItem> 
                    <MenuItem value='Kampong Speu'>Kampong Speu</MenuItem> 
                    <MenuItem value='Kampong Thom'>Kampong Thom</MenuItem>
                    <MenuItem value='Kampot'>Kampot</MenuItem> 
                    <MenuItem value='Kandal'>Kandal</MenuItem>
                    <MenuItem value='Koh Kong'>Koh Kong</MenuItem>
                    <MenuItem value='Kratie'>Kratie</MenuItem>
                    <MenuItem value='Mondolkiri'>Mondulkiri</MenuItem>
                    <MenuItem value='Phnom Penh'>Phnom Penh</MenuItem> 
                    <MenuItem value='Prey Veng'>Prey Veng</MenuItem>
                    <MenuItem value='Pursat'>Pursat</MenuItem>
                    <MenuItem value='Ratanakiri'>Ratanakiri</MenuItem>
                    <MenuItem value='Siem Reap'>Siem Reap</MenuItem> 
                    <MenuItem value='Preah Sihanouk'>Preah Sihanouk</MenuItem>
                    <MenuItem value='Stung Treng'>Stung Treng</MenuItem>
                    <MenuItem value='Svay Rieng'>Svay Rieng</MenuItem>
                    <MenuItem value='Takeo'>Takeo</MenuItem>
                    <MenuItem value='Oddar Meanchey'>Oddar Meanchey</MenuItem> 
                    <MenuItem value='Kep'>Kep</MenuItem>
                    <MenuItem value='Pailin'>Pailin</MenuItem>
                    <MenuItem value='Tboung Khmum'>Tboung Khmum</MenuItem>
                </Select>
                {errors.city && <FormHelperText error={errors.city?true:false}>{errors.city}</FormHelperText>}
                </FormControl><br /><br />
                
                <FormControl fullWidth>
                <InputLabel size="small" error={errors.gender?true:false} id="demo-simple-select-label">Gender</InputLabel>
                <Select 
                    error={errors.gender?true:false} 
                    size='small'
                    value={inputs.gender}
                    label="Gender"
                    name="gender"
                    onChange={handleInputs}>
                    <MenuItem value='Male'>Male</MenuItem>  
                    <MenuItem value='Female'>Female</MenuItem> 
                    <MenuItem value='Special'>Special</MenuItem> 
                </Select>
                {errors.gender && <FormHelperText error={errors.gender?true:false}>{errors.gender}</FormHelperText>}
                </FormControl><br /><br />

                {/* <TextField
                    label="Birthday"
                    type="date"
                    size="small"
                    value={inputs.birthday}
                    onChange={handleInputs}
                    sx={{ width: '100%'}}
                    name='birthday'
                    InputLabelProps={{
                    shrink: true,}} /><br /><br /> */}
                
                <Field error={errors.phone?true:false} helperText={errors.phone?errors.phone:''} type="text" name="phone" value={inputs.phone} onChange={handleInputs} className='pf-detail-input' label="Phone Number (+855)" variant="outlined" size="small" />< br/><br/>
                <Field error={errors.address?true:false} helperText={errors.address?errors.address:''} type="text" name="address" value={inputs.address} onChange={handleInputs} className='pf-detail-input' label="Address" variant="outlined" size="small" />< br/><br/>
                <Field error={errors.interested_job?true:false} helperText={errors.interested_job?errors.interested_job:''} type="text" name="interestedJob" value={inputs.interestedJob} onChange={handleInputs} className='pf-detail-input' label="Interested Job (Ex: Web Developer, Accountant..)" variant="outlined" size="small" />< br/><br/>
                
                <FormControl fullWidth>
                <InputLabel size="small" error={errors.job_level?true:false} id="demo-simple-select-label">Your Job Level</InputLabel>
                <Select
                    error={errors.job_level?true:false}
                    size='small'
                    value={inputs.jobLevel}
                    label="Your Job Level"
                    name="jobLevel"
                    onChange={handleInputs}>
                    <MenuItem value='Internship'>Internship</MenuItem> 
                    <MenuItem value='Entry-Level'>Entry-Level</MenuItem> 
                    <MenuItem value='Junior'>Junior</MenuItem>
                    <MenuItem value='Senior'>Senior</MenuItem> 
                    <MenuItem value='Top Executetive Level'>Top Executive Level</MenuItem> 
                </Select>
                {errors.job_level && <FormHelperText error={errors.job_level?true:false}>{errors.job_level}</FormHelperText>}
                </FormControl><br /><br />
                
                <p style={{marginBottom: '2px'}}>Please Choose your birthday</p>
                <div className="rainbow-m-around_small">
                    <DatePicker
                    value={inputs.birthday}
                    onChange={value=>setInputs({...inputs, ['birthday']: value})}
                    name="birthday"
                    type='date'
                    style={{borderRadius: 'none'}}
                    />
                </div>
                {errors.birthday && <p style={{color: 'red'}}>{errors.birthday}</p>}
                    <br/>

                <Editor
                    style={{height: 'max-content'}}
                    onInit={(evt, editor) => editorRef.current = editor}
                    value={inputs.description}
                    initialValue="<p>Describe About Yourself......</p>"
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}

                    onEditorChange={(newText) =>setInputs({...inputs, ['description']: newText})}
                />
                 {errors.description && <p style={{color: 'red'}}>{errors.description}</p>}   
                <br />
                    
                <Button variant="contained" type="submit" style={{width: '100%'}}>Submit</Button>
                </form><br /><br />
            </div>
        );
    }
}
 
export default CandidateInfo;