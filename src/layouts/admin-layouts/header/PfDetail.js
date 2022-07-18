import { Hidden, Slide, Slider, TextField } from '@mui/material';
import axios from 'axios';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiHeadersWithToken } from '../../../api/apiHeaders';
import { ApiKey } from '../../../api/apiKey';
import { getAuthToken } from '../../../features/adminSlice/adminSlice';
import './pfDetail.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { SetPageTitle } from '../../../setPageTitle';
import AlertDialogSlide from '../../../common/material/DialogBox';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { dialogTextField } from '../../../common/material/dialogTextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noProfile from './no-pf.jpg';
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../../common/material/croppedImage';




const Field = dialogTextField;

const PfDetail = () => {
    //Redux Toolkit
    const token = useSelector(getAuthToken);
    
    //React Router Dom
    const navigate = useNavigate();
    const {user_id} = useParams();
    
    //All States
        //For Dialog Box
        const [isOpenPwChange, setIsOpenPwChange] = useState(false);
        const [isOpenPfChange, setIsOpenPfChange] = useState(false);

    const [isPending, setIsPending] = useState(true);
    const [isShowPassword, setIsShowPassword]= useState(false);
    const [user, setUser] = useState(['']);
    const [isRefresh, setIsRefresh] = useState(false);
    const [submitTextProfile, setSubmitTextProfile] = useState('Upload'); 
    const [submitTextEmail, setSubmitTextEmail] = useState("Change Email");
    const [submitTextResend, setSubmitTextResend] = useState("Resend email verification");
    const [submitTextUsername, setSubmitTextUsername] = useState("Save");
    const [submitTextPassword, setSubmitTextPassword] = useState("Change");
    const [isUpdating, setIsUpdating] = useState({
        email: false,
        resend: false,
        username: false,
        password: false,
        avatar: false,
    });
    const [error, setError]= useState(['']);
    const [inputs, setInputs]= useState({
        username: '',
        email: '',
        
    });
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [pwInputs, setPwInputs] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    //Page Title
    SetPageTitle(user.username?user.username:'loading...');

    //Style
    const avatarStyle = {
        backgroundImage: `url(${user.avatar === null ? noProfile : ApiKey+'/'+user.avatar})`,
        cursor: 'pointer',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    const avatarPreviewStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: 'grey',
        backgroundImage: `url(${avatar == '' ? ApiKey+'/'+user.avatar : avatarPreview})`,
        backgroundSize: 'cover',
        overflow: 'Hidden',
        backgroundRepeat: 'no-repeat',
        margin: '0 auto',
    }

    //handle inputs
    const handleUpdateInputs = (e)=> {
        return setInputs({...inputs, [e.target.name]: e.target.value});
    } 

    const handlePasswordInputs = (e)=>{
        return setPwInputs({...pwInputs, [e.target.name]: e.target.value});
    }

    //Fetch User
    const handleFetch = async()=>{
        
        const response = await axios.get(`${ApiKey}/api/user/detail`, apiHeadersWithToken(token));

        if(response.data.status === 200){
            const data = response.data.user;
            setUser(data);
            setInputs({username: data.username, email: data.email});
            setIsPending(false);
        }
    }

    //Update Email
    const handleUpdateEmail = async(e) =>{
        e.preventDefault();

        setIsUpdating({email: true});
        setSubmitTextEmail("Changing Email...");
        const data = {email: inputs.email}
        const response = await axios.post(`${ApiKey}/api/user/update_email`, data, apiHeadersWithToken(token));
        
        const res = response.data;

        if(res.status === 200){
              setIsRefresh(!isRefresh);
              setError(['']);
              setSubmitTextEmail("Done");
        }else{
            setSubmitTextEmail("Change Email");
            setIsUpdating({email: false});
            setError(res.errors);
        }
    }
    //Resend Verification Email
    const handleResendClick = async()=>{
        setIsUpdating({resend: true})
        setSubmitTextResend("Sending");

        await axios.get(`${ApiKey}/api/email/resend`, apiHeadersWithToken(token))
        .then(response=>{
            setSubmitTextResend("Mail was sent, please check your inbox");
        });
    }
    
    //Update Username
    const handleUpdateUsername = async(e) => {
        e.preventDefault();
        console.log('he')
        const data = {username: inputs.username};
        setIsUpdating({username: true});
        setSubmitTextUsername("Saving...");
        const response = await axios.post(`${ApiKey}/api/user/update_username`, data, apiHeadersWithToken(token));

        if(response.data.status === 200){
            Swal.fire(
                'Done!',
                'Succesful changed',
                'success'
              )
            setError(['']);
            setSubmitTextUsername('Save');
        }else{
            setIsUpdating({username: false});
            setSubmitTextUsername("Save");
            setError(response.data.errors);
        }

    }

    //Handle Change Password
    const handleChangePassword = async(e)=>{
        e.preventDefault();
        setIsUpdating({password: true});
        const data = {oldPassword: pwInputs.oldPassword, newPassword: pwInputs.newPassword, confirmNewPassword: pwInputs.confirmNewPassword};
        setSubmitTextEmail('changing...');
        const response = await axios.post(`${ApiKey}/api/user/change_password`, data, apiHeadersWithToken(token));
        
        if(response.data.status === 200){
            setSubmitTextEmail('Done');
            navigate('/logging_out', {replace: true});
        }
        if(response.data.status === 403){
            setSubmitTextEmail('Change');
            setIsUpdating({password: false});
            setIsOpenPwChange(false);
            Swal.fire(
                'Forbidden',
                'Your old password is invalid',
                'warning'
              )
            
        }
        if(response.data.status === 404){
            setError(response.data.errors);
            setSubmitTextEmail('Change');
            setIsUpdating({password: false});
            
        }

        if(response.data.status === 402){

            setSubmitTextEmail('Change');
            setIsUpdating({password: false});
            setIsOpenPwChange(false);

            Swal.fire(
                'Forbidden',
                response.data.message,
                'warning'
              )
        }
    }
    //Cropper
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedPosition, setCroppedPosition] = useState(null);

    //Handle Avatar Input
    const handleAvatarInput = (e)=>{
        //preview image
            setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    }

    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        setCroppedPosition(croppedAreaPixels);
        const {file, url} = await getCroppedImg(avatarPreview, croppedAreaPixels);
         
         const blobToFile = new File([file], file.name, {
             type: file.type
         });
 
         setAvatar(blobToFile);
        //  console.log(avatar)
     }

    useEffect(()=>{
        
    }, [isRefresh]);

    //Handle Changing Profile picture;
    const handleChangeProfile = async(e)=>{
        e.preventDefault();
        setIsUpdating({avatar: true});
        setSubmitTextProfile('Uploading...');
        const formData = new FormData();
        formData.append('avatar', avatar);

        const response = await axios.post(`${ApiKey}/api/user/change_avatar`, formData, apiHeadersWithToken(token));
        
        if(response.data.status === 200){
            setSubmitTextProfile('Done');
            setAvatar('');
            setIsOpenPfChange(false);
            setIsRefresh(!isRefresh);
            setAvatarPreview(null);

        }else{
            setSubmitTextProfile('Upload');
            setIsUpdating({avatar: false});
        }
    }

    //Change Profile Form
    const changePfBody = <form onSubmit={handleChangeProfile} className='change-profile-form'>
        <FontAwesomeIcon onClick={()=>setIsOpenPfChange(false)} style={{fontSize: '30px', color: 'black', alignItems: 'right', cursor: 'pointer'}} icon={faXmark} />
        <h4 style={{textAlign: 'center'}}>Change Profile</h4>
        <br />
        {avatarPreview === null ?
        <><div style={avatarPreviewStyle}></div><br /></>
        :<>
        <div className='cropper'>
            <Cropper
                image={avatarPreview}
                crop={crop}
                zoom={zoom}
                cropShape='round'
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />
            </div>
            <Slider
            value={zoom}
            min={1}
            max={3}
            style={{width: '100%'}}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
          />
          </>}
        <Form.Control type="file" onChange={handleAvatarInput}/><br />
        <div><Button type='submit' variant="warning" style={{width: '100%'}}>{submitTextProfile}</Button></div>
        <hr />
    </form>


     //handle show or hide password
     const handleShowOrHidePassword = (e)=>{
        if(e.target.checked){
            setIsShowPassword(true);
        }else{
            setIsShowPassword(false);
        }
    }
    
    //Change Password Form
    const changePwBody = <form onSubmit={handleChangePassword} className='change-password-form'>
    <FontAwesomeIcon onClick={()=>setIsOpenPwChange(false)} style={{fontSize: '30px', color: 'black', alignItems: 'right', cursor: 'pointer'}} icon={faXmark} />
     <h4 style={{textAlign: 'center'}}>Change Password</h4>
     
     <br />
     <div style={{color: '#c9a202'}}>Warning! <span style={{color:'grey'}}>You have to logout all of other devices automatically after you changed your password.</span></div>
     <br />
     <Field error={error.oldPassword?true:false} helperText={error.oldPassword?error.oldPassword:''} onChange={handlePasswordInputs} value={pwInputs.oldPassword} name='oldPassword' className='data-input' label="Old Password" type={isShowPassword?'text':'password'}/>
     <Field error={error.newPassword?true:false} helperText={error.newPassword?error.newPassword:''} onChange={handlePasswordInputs} value={pwInputs.newPassword} name='newPassword' className='data-input' label="New Password" type={isShowPassword?'text':'password'}/>
     <Field error={error.confirmNewPassword?true:false} helperText={error.confirmNewPassword?error.confirmNewPassword:''} onChange={handlePasswordInputs} value={pwInputs.confirmNewPassword} name='confirmNewPassword' className='data-input' label="Confirm New Password" type={isShowPassword?'text':'password'}/><br />
     <Form.Check onChange={handleShowOrHidePassword} type="checkbox" label="Show password" /><br />
     <div id={isUpdating.password?'no-drop-btn':''}><Button disabled={isUpdating.password?true:false}className="job-btn" type='submit' variant="primary">{submitTextPassword}</Button></div>
    {error.forbidden}
    </form>;

    //Open Change Password Dialog
    const handleClosePwChangeDialog = ()=>{
        setIsOpenPwChange(false);
    }
    //Open Change Profile Dialog
    const handleClosePfChangeDialog = ()=>{
        setIsOpenPfChange(false);
    }

    //refresh when something changes
    useEffect(()=>{
        handleFetch();
    }, [isRefresh]);

                return (
                    <div className="pf-detail">
                        <br />
                        {isPending === true?
                        <div
                        style={{
                            marginTop: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }} 
                    ><div><Spinner animation="border"/></div></div>
                        :
                        <Fragment>{user_id === user.user_id ?
                        <div className="pf-detail-parent">
                            <div  className="pf-detail-avatar-parent">
                                <div onClick={()=>setIsOpenPfChange(true)} style={avatarStyle} className="pf-detail-avatar"></div>
                            </div>
                            
                            <div className="pf-detail-username-parent">
                                <div><b>{inputs.username}</b></div>
                            </div>
                            
                            <div className="pf-detail-update">
                                <br />
                                <form onSubmit={handleUpdateUsername}>
                                    <div>CHANGE USERNAME</div><br />
                                    <TextField error={error.username?true:false} helperText={error.username?error.username:''} type="text" name="username" value={inputs.username} onChange={handleUpdateInputs} className='pf-detail-input' label="Username" variant="outlined" />< br/>
                                    <div style={{display: 'block'}} id={isUpdating.username || inputs.username === user.username?'no-drop-btn':''}><Button disabled={isUpdating.username || inputs.username === user.username?true:false} type="submit" variant="primary" className="btn-submit">{submitTextUsername}</Button></div>
                                </form><br />

                                <form onSubmit={handleUpdateEmail}>
                                    <div>CHANGE EMAIL</div><br />
                                    <TextField error={error.email?true:false} helperText={error.email ? error.email: ''} type="email" name="email" value={inputs.email} onChange={handleUpdateInputs} className='pf-detail-input' label="Email" variant="outlined" />
                                    <div id={isUpdating.email?'no-drop-btn':''}><Button disabled={isUpdating.email?true:false}  type="submit" variant="warning" className="btn-submit">{submitTextEmail}</Button></div>
                                    {submitTextEmail === 'Done'&&<div className='successful-changed'>Your Email has been Changed.</div>}
                                    {user.email_verified_at == null ? <div ><div className='verify-text'><p><DoDisturbOnIcon style={{fontSize: '18px'}} />Your Email is not verify</p><p>Please Check your email inbox to verify your email. If you cannot find the mail please click the below button</p><p><b>Note:</b> You have to login again after you verified your email</p><div id={isUpdating.resend?'no-drop-btn':''}><Button onClick={handleResendClick} disabled={isUpdating.resend?true:false} variant='primary' style={{width: '100%'}}>{submitTextResend}</Button></div></div></div>
                                    :<div className='successful-changed'><CheckCircleIcon style={{fontSize: '18px'}}/>Your email is verified.</div>}
                                </form>

                                <br />
                                <div>
                                    <div>Want to change your password? click this below button</div>
                                    <div onClick={()=>setIsOpenPwChange(true)}><Button variant="secondary" className="btn-submit">Change Password</Button></div>
                                    
                                </div>
                                {AlertDialogSlide(isOpenPwChange, changePwBody, handleClosePwChangeDialog)}
                                {AlertDialogSlide(isOpenPfChange, changePfBody, handleClosePfChangeDialog)}
                            </div>
                        </div>
                        :<div>un-auth</div>}</Fragment>}
                        
                    </div>
                );
            
}
 
export default PfDetail;