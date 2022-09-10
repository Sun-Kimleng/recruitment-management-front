import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { apiHeadersWithToken } from '../../api/apiHeaders';
import { ApiKey } from '../../api/apiKey';
import { dialogTextField } from '../../common/material/dialogTextField';
import { getAuthToken, setTriggerLeftBarFalse } from '../../features/adminSlice/adminSlice';
import noPf from './no-pf.jpg';
import './manageUser.css';
import AlertDialogSlide from '../../common/material/DialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SetPageTitle } from '../../setPageTitle';
import IndicatePassword from './indicatePassword';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UserInfo from './userInfo';

const Field = dialogTextField;
const ManageUser = () => {

    SetPageTitle('Manage Users');

    //Redux Toolkit
    const token = useSelector(getAuthToken);
    const dispatch = useDispatch();
    //All States
    const [isRefresh, setIsRefresh] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [addingUsersText, setAddingUserText] = useState('Add');
    const [error, setError] = useState(['']);
    const [admins, setAdmins] = useState(['']);
    const [editors, setEditors] = useState(['']);
    const [moderators, setModerators] = useState(['']);
    const [isPendingAdmin, setIsPendingAdmin] = useState(true);
    const [isPendingEditor, setIsPendingEditor] = useState(true);
    const [isPendingModerator, setIsPendingModerator] = useState(true);
    const [isSubmittingUserRole, setIsSubmittingUserRole] = useState(false);
    const [isSubmittingRemoveUser, setIsSubmittingRemoveUser] = useState(false);
    const [errorVerifyPassword, setErrorVerifyPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [isSubmittingDeactivate, setIsSubmittingDeactivate] = useState(false);
    const [deactivateUserText, setDeactivateUserText] = useState('Deactivate');
    const [isSubmittingReactivate, setIsSubmittingReactivate] = useState(false);
    const [reactivateUserText, setReactivateUserText] = useState('Reactivate');
    const [isOpenRemoveUser, setIsOpenRemoveUser] = useState(false);
    const [inputs, setInputs]= useState({
        username: '',
        role: '',
        email: '',
        confirmPassword: '',
    });

    const [password, setPassword]= useState('');
    const [triggerUpdateById, setTriggerUpdateById] = useState('');
    const [updateRole, setUpdateRole] =useState('');
    const [role, setRole] = useState(null);
    const [roleForUpdate, setRoleForUpdate] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userIdRemoveUser, setUserIdRemoveUser] = useState(null);
    const [triggerPwSuggestion, setTriggerPwSuggestion] = useState(false);
    const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);
 
    //Handle All Inputs
    const handleInputs = (e)=>{
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    //handle Indicate Password
    const [check, setCheck] = useState(
        {   
            checkLength: false,
            checkUpperCase: false,
            checkLowerCase: false,
            checkValDigit:false,
            checkValSpecialChar: false,
        }
    );
       
    const handleIndicatePassword = (e)=>{
        setPassword(e.target.value);

        const {value}= e.target;

        if(e.target.value !== ''){
            setTriggerPwSuggestion(true);
        }else{
            setTriggerPwSuggestion(false);
        }

        const valLength = /^.{8,}$/.test(value); //At least 8 characters
        const valUpperCase = /[A-Z]/.test(value); //At least 1 Uppercase
        const valLowerCase = /[a-z]/.test(value); //At least 1 Lowercase
        const valDigit = /[0-9]/.test(value); //At least 1 Digit
        const valSpecialChar = /[^A-Za-z0-9]/.test(value); //At least One SpecialChar
    
        setCheck({
            checkLength: valLength,
            checkUpperCase: valUpperCase,
            checkLowerCase: valLowerCase,
            checkValDigit: valDigit,
            checkValSpecialChar: valSpecialChar,
        });
        
    }

    //handleClose
    const handleClose = ()=>{
        setIsOpen(false);
    }

    //handleCloseRemoveUser
    const handleCloseRemoveUser = ()=>{
        setIsOpenRemoveUser(false);
    }

    //Fetch User
    const handleFetchUser = async()=>{
        
        //Admin
        const responseAdmin = await axios.get(`${ApiKey}/api/user/get_admin`, apiHeadersWithToken(token));

        if(responseAdmin.data.status === 200){
            setAdmins(responseAdmin.data.user);
            setIsPendingAdmin(false);
        }

        //Editor
        const responseEditor = await axios.get(`${ApiKey}/api/user/get_editor`, apiHeadersWithToken(token));

        if(responseEditor.data.status === 200){
            setEditors(responseEditor.data.user);
            setIsPendingEditor(false);
        }

        //Moderator
        const responseModerator = await axios.get(`${ApiKey}/api/user/get_moderator`, apiHeadersWithToken(token));

        if(responseModerator.data.status === 200){
            setModerators(responseModerator.data.user);
            setIsPendingModerator(false);
        }
    }

    //Handle Create New Users
    const handleCreateNewUser = async (e)=>{
      e.preventDefault();
      const data = {
        username: inputs.username,
        email: inputs.email,
        password: password,
        confirmPassword: inputs.confirmPassword,
        role: role,
      }
      setIsSubmitting(true);
      setAddingUserText('Adding...');

      const response = await axios.post(`${ApiKey}/api/user/admin_creates_users`, data, apiHeadersWithToken(token));

      if(response.data.status === 200){
            setIsSubmitting(false);
            setIsRefresh(!isRefresh);
            setAddingUserText('Add');
            setError(['']);
            setPassword('');
            setRole(null);
            setInputs({
                username: '',
                role: '',
                email: '',
                password: '',
                confirmPassword: '',
            })
            Swal.fire(
                'Done!',
                'Succesful added',
                'success'
              );
            setTriggerPwSuggestion(false);
      }else{
        setIsSubmitting(false);
        setAddingUserText('Add');
        setError(response.data.error);
      }
    }

    //Handle Edit User Role
    const handleEditUserRole = async(e)=>{
        e.preventDefault();
        setIsSubmittingUserRole(true);
       
        const data={role: roleForUpdate, password: passwordVerify}

        const response = await axios.put(`${ApiKey}/api/user/edit_user_role/${userId}`, data, apiHeadersWithToken(token))

        if(response.data.status === 200){
            Swal.fire(
                'Done!',
                'Succesful Updated',
                'success'
              );
            setTriggerUpdateById('');
            setUserId(null);
            setErrorVerifyPassword('');
            setPasswordVerify('');
            setIsSubmittingUserRole(false);
            setIsRefresh(!isRefresh);
            setIsOpen(false);
        }
        
        if(response.data.status === 404){
            Swal.fire(
                'Warning!',
                'Role field cannot be empty or the role cannot be the same as the old one',
                'warning'
              );
            setTriggerUpdateById('');
            setIsSubmittingUserRole(false);
            setErrorVerifyPassword('');
            setUserId(null);
            setIsOpen(false);
        }
        if(response.data.status === 402){
            Swal.fire(
                'Warning!',
                'You cannot edit your own role. Please, ask other admins to edit your role',
                'warning'
              );
            setTriggerUpdateById('');
            setIsSubmittingUserRole(false);
            setUserId(null);
            setErrorVerifyPassword('');
            setIsOpen(false);
        }
        if(response.data.status === 429){
            setErrorVerifyPassword(response.data.message);
            setIsSubmittingUserRole(false);
        }
    }

    //Handle remove user
    const handleRemoveUser = async(e)=>{
        
        e.preventDefault();
        setIsSubmittingRemoveUser(true);
        const data={password: passwordVerify}
        const response = await axios.post(`${ApiKey}/api/user/delete_user/${userIdRemoveUser}`, data, apiHeadersWithToken(token));

        if(response.data.status === 200){
            setIsSubmittingRemoveUser(false);
            setUserIdRemoveUser(null);
            setIsOpenRemoveUser(false);
            setIsRefresh(!isRefresh);
            setPasswordVerify('');
            setErrorVerifyPassword('');

            Swal.fire(
                'Done!',
                'Successful deteted the user',
                'success'
            );
        }

        if(response.data.status === 404){
            setIsSubmittingRemoveUser(false);
            setErrorVerifyPassword(response.data.message);
        }

        if(response.data.status === 402){
            setIsSubmittingRemoveUser(false);
            setIsOpenRemoveUser(false);
            setErrorVerifyPassword('');
            
            Swal.fire(
                'Warning!',
                'You cannot remove this user! This user is associated with the data inside the application. You may first try to delete the data that associated with this user before you remove this user otherwise you can deactivate this user instead.',
                'warning'
            );
        }

        if(response.data.status === 429){
            setIsSubmittingRemoveUser(false);
            setErrorVerifyPassword('');
            setErrorVerifyPassword(response.data.message);
        }
    }  
    //Handle Verify Password
    const handleVerifyPassword = (id)=>{
        setIsOpen(true);
        setUserId(id)
    }
    
    //Handle Verify for remove user
    const handleVerifyPasswordRemoveUser = (id)=>{
        setIsOpenRemoveUser(true);
        setUserIdRemoveUser(id)
    }
    
    //Trigger button to update the user role
    
    const handleTriggerUpdate = (id, role)=>{
        setTriggerUpdateById(id);
        setUpdateRole(role);
    }
    
    //Handle Deactivate User
    const handleDeativateUser = async(id)=>{
        
        const response = await axios.put(`${ApiKey}/api/user/deactivate_user/${id}`,{}, apiHeadersWithToken(token));
        
        setIsSubmittingDeactivate('Deativating...');
        setIsSubmittingReactivate('Reactivating...');
        setIsSubmittingDeactivate(true);
        setIsSubmittingReactivate(true);

        if(response.data.status === 200){
            setIsRefresh(!isRefresh);
            Swal.fire(
                'Done!',
                'This account has been deactivated.',
                'success'
            );
            setIsSubmittingDeactivate(false);
            setIsSubmittingReactivate(false);
            setDeactivateUserText('Deactivate');
            setReactivateUserText('Reactivate');
        }

        if(response.data.status === 201){
            setIsRefresh(!isRefresh);
            Swal.fire(
                'Done!',
                'This account has been reactivated.',
                'success'
            );
            setIsSubmittingDeactivate(false);
            setIsSubmittingReactivate(false);
            setDeactivateUserText('Deactivate');
            setReactivateUserText('Reactivate');
        }
        
        if(response.data.status === 404){
            Swal.fire(
                'warning!',
                'You cannot deactivate your own account.',
                'warning'
            );
            setIsSubmittingDeactivate(false);
            setIsSubmittingReactivate(false);
            setDeactivateUserText('Deactivate');
            setReactivateUserText('Reactivate');
        }
    }
    //Handle Click Show Password
    const [showPassword, setShowPassword]= useState(false);

    const handleClickShowPassword = ()=>{
        setShowPassword(!showPassword);
    }

    //Handle Click Show Confirm Password
    const [showConfirmPassword, setShowConfirmPassword]= useState(false);

    const handleClickShowConfirmPassword = ()=>{
        setShowConfirmPassword(!showConfirmPassword);
    }
    const body = (<div>
        
        <form onSubmit={handleEditUserRole} autoComplete='new-password' className="edit-user-form">
        <FontAwesomeIcon onClick={()=>setIsOpen(false)} style={{fontSize: '30px', color: 'black', alignItems: 'right',cursor: 'pointer'}} icon={faXmark} />
        <h5>Confirm Your Password</h5>
        <Field error={errorVerifyPassword!==''?true:false} helperText={errorVerifyPassword!==''?errorVerifyPassword:''} value={passwordVerify} onChange={(e)=>setPasswordVerify(e.target.value)} autoComplete='new-password' name='password' type='password' className='data-input' size="small" label="Password" />{' '}
        <div id={isSubmittingUserRole?'no-drop':''}><Button disabled={isSubmittingUserRole?true:false} type='submit' variant="primary" style={{marginTop: '10px', width: '100%'}}>Confirm</Button></div>
        </form>
    </div>);

    const bodyRemoveUser = (<div>
        
        <form onSubmit={handleRemoveUser} autoComplete='new-password' className="edit-user-form">
        <FontAwesomeIcon onClick={()=>setIsOpenRemoveUser(false)} style={{fontSize: '30px', color: 'black', alignItems: 'right', cursor: 'pointer'}} icon={faXmark} />
        <h5>Confirm Your Password</h5>
        <Field error={errorVerifyPassword!==''?true:false} helperText={errorVerifyPassword!==''?errorVerifyPassword:''} value={passwordVerify} onChange={(e)=>setPasswordVerify(e.target.value)} autoComplete='new-password' name='password' type='password' className='data-input-pw' size="small" label="Password" />{' '}
        <div id={isSubmittingRemoveUser?'no-drop':''}><Button disabled={isSubmittingRemoveUser?true:false} type='submit' variant="primary" style={{marginTop: '10px', width: '100%'}}>Confirm</Button></div>
        </form>
    </div>);

    //Handle Trigger User Info
    const [triggerUserInfo, setTriggerUserInfo] = useState('');
    const handleTriggerUserInfo= (id)=>{
        setTriggerUserInfo(id);
        setIsOpenUserInfo(true);
    }

    //Refreshing when something changes
     useEffect(()=>{
        handleFetchUser();
        dispatch(setTriggerLeftBarFalse(true));
    }, [isRefresh]);

        return ( 
            <div className="manage-user"><br /><br />
                <p>Configuration &#62; Manage User </p>
                <h1 style={{textAlign: 'center'}}>Manage Users</h1><br />
                <form onSubmit={handleCreateNewUser} autoComplete="new-password" className='add-new-user-form'>
                    <h5>REGISTER A NEW USER</h5>
                    <Field error={error.username?true:false} helperText={error.username?error.username:''} onChange={handleInputs} value={inputs.username} name='username'type='text' className='data-input-username' size="small" label="Username"/>
                    {' '}
                    <FormControl>
                    <InputLabel value={inputs.username} onChange={handleInputs} size="small" id="demo-simple-select-label">Role</InputLabel>
                    <Select label='Role' error={error.role?true:false}  value={inputs.role} onChange={handleInputs} size="small" name='role' className='data-input-role' style={{width: '150px'}}>
                        <MenuItem onClick={()=>setRole('nfoqbehdk283')} value='select1'><div >Admin</div></MenuItem>
                        <MenuItem onClick={()=>setRole('dbqqajdnbe921')} value='select2'><div >Editor</div></MenuItem>
                        <MenuItem onClick={()=>setRole('zjeklsnbn323')} value='select3'><div >Moderator</div></MenuItem>
                    </Select>
                    </FormControl>
                    
                    <Field error={error.email?true:false} helperText={error.email?error.email:''} value={inputs.email} onChange={handleInputs} name='email' type='email' className='data-input-email' size="small" label="Email" />
                    <Field error={error.password?true:false} helperText={error.password?error.password:''} value={password} onChange={handleIndicatePassword} autoComplete="new-password" name='password' type={showPassword?'text':'password'} className='data-input-pw' size="small" label="Password" 
                        InputProps={{
                            endAdornment: <div style={{marginLeft: '3px',cursor: 'pointer', color:'grey'}}onClick={handleClickShowPassword}>{!showPassword ? <VisibilityOff style={{color: 'grey'}}/> : <Visibility style={{color: 'black'}}/>}</div>
                          }} />{' '}
                    <Field error={error.confirmPassword?true:false} helperText={error.confirmPassword?error.confirmPassword:''} value={inputs.confirmPassword} onChange={handleInputs} name='confirmPassword' type={showConfirmPassword?'text':'password'} className='data-input-pw' size="small" label="Confirm Password" 
                    InputProps={{
                        endAdornment: <div style={{marginLeft: '3px',cursor: 'pointer', color:'grey'}} onClick={handleClickShowConfirmPassword}>{!showConfirmPassword ? <VisibilityOff style={{color: 'grey'}}/> : <Visibility style={{color: 'black'}}/>}</div>
                      }} />{' '}
                    <IndicatePassword 
                        checkLength={check.checkLength?'valid':'invalid'}
                        checkUpperCase={check.checkUpperCase?'valid':'invalid'}
                        checkLowerCase={check.checkLowerCase?'valid':'invalid'}
                        checkDigit={check.checkValDigit?'valid':'invalid'}
                        checkSpecialChar={check.checkValSpecialChar?'valid':'invalid'}
                        triggerPwSuggestion={triggerPwSuggestion}
                    />
                    <div id={isSubmitting?'no-drop':''}><Button disabled={isSubmitting?true:false} type='submit' variant="primary" style={{marginTop: '10px', width: '100%'}}>{addingUsersText}</Button></div>
                </form>
                <br />

                {/* Admin */}
                <div style={{marginLeft: '5px'}}>
                    <h5 style={{marginBottom: '-10px'}}><b>Existing Users</b></h5><br />
                    
                    <h6>Admin</h6><hr style={{marginTop: '-5px'}}/>
                    {isPendingAdmin?
                    <div
                    style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }} 
                    ><div><Spinner animation="border"/></div></div>
                    :
                    <>
                    {admins.map((admin, index)=>(
                    <div key={index}>
                    {/* User Info */}
                    {triggerUserInfo === admin.id &&<UserInfo id={admin.id} isOpen={isOpenUserInfo} triggerIsOpenById={triggerUserInfo} setIsOpen={setIsOpenUserInfo}/>}
                    <div className="user-pf-parent">
                        <div className="user-pf-child-left" onClick={()=>handleTriggerUserInfo(admin.id)}>
                            <div className='user-pf-pic' style={{backgroundImage: `url(${admin.avatar === null?noPf:ApiKey+'/'+admin.avatar})`}}></div>
                            <div className="user-pf-text">
                                <div className="user-pf-username"><b>{admin.username}</b></div>
                                <div className="user-pf-role" style={{fontSize: '10px', color: 'grey'}}>Admin</div>
                            </div>
                        </div>
                        <div className="user-pf-child-right">
                            <div className='user-pf-actions'>
                                {triggerUpdateById!==admin.id
                                ?
                                <>
                                {
                                admin.user_status === 'deactivated'
                                ?
                                <>
                                    <div style={{display: 'inline-block', color: '#d32f2f'}}><b>Deactivated</b></div> {' '}
                                    <Button disabled={isSubmittingReactivate?true:false} variant="secondary" onClick={()=>handleDeativateUser(admin.id)} size='sm'>{reactivateUserText}</Button>{' '}
                                </>
                                :
                                <>
                                    <Button variant="warning" onClick={()=>handleTriggerUpdate(admin.id, 'select1')} size='sm'>Edit Role</Button>{' '} 
                                    <Button disabled={isSubmittingDeactivate?true:false} variant="danger" onClick={()=>handleDeativateUser(admin.id)} size='sm'>{deactivateUserText}</Button>{' '} 
                                    <Button variant="secondary" onClick={()=>handleVerifyPasswordRemoveUser(admin.id)} size='sm'>Remove</Button>  
                                </>}
                                </>
                                :
                                <>
                                <FormControl>
                                <InputLabel value={inputs.username} onChange={handleInputs} size="small" id="demo-simple-select-label">Role</InputLabel>
                                <Select label='Role'  value={updateRole} onChange={(e)=>setUpdateRole(e.target.value)} size="small" name='role' className='data-input-role-update-user' style={{width: '150px'}}>
                                    <MenuItem onClick={()=>setRoleForUpdate('nfoqbehdk283')} value='select1'><div >Admin</div></MenuItem>
                                    <MenuItem onClick={()=>setRoleForUpdate('dbqqajdnbe921')} value='select2'><div >Editor</div></MenuItem>
                                    <MenuItem onClick={()=>setRoleForUpdate('zjeklsnbn323')} value='select3'><div >Moderator</div></MenuItem>
                                </Select>
                                </FormControl>{' '}

                                <Button variant="primary" onClick={()=>handleVerifyPassword(admin.id)} size='sm'>Update</Button>{' '}
                                <Button variant="secondary" onClick={()=>{setTriggerUpdateById(''); setRoleForUpdate(null); setUserId(null)}} size='sm'>Cancel</Button>  
                                </>
                                }
                            </div>
                        </div>
                        
                    </div><hr />
                    </div>
                    ))} </>}
                </div>

                {/* Editor */}
                {editors.length === 0
                ?
                <div></div>
                :
                <div style={{marginLeft: '5px', marginTop: '20px'}}>
                    <h6>Editor</h6><hr style={{marginTop: '-5px'}}/>
                    {isPendingEditor?
                    <div
                    style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }} 
                    ><div><Spinner animation="border"/></div></div>
                    :
                    <>
                    {editors.map((editor, index)=>(
                    <div key={index}>
                   {/* User Info */}
                   {triggerUserInfo === editor.id &&<UserInfo id={editor.id} isOpen={isOpenUserInfo} triggerIsOpenById={triggerUserInfo} setIsOpen={setIsOpenUserInfo}/>}
                    <div className="user-pf-parent">
                        <div className="user-pf-child-left" onClick={()=>handleTriggerUserInfo(editor.id)}>
                            <div className='user-pf-pic' style={{backgroundImage: `url(${editor.avatar === null?noPf:ApiKey+'/'+editor.avatar})`}}></div>
                            <div className="user-pf-text">
                                <div className="user-pf-username"><b>{editor.username}</b></div>
                                <div className="user-pf-role" style={{fontSize: '10px', color: 'grey'}}>Editor</div>
                            </div>
                        </div>
                        <div className="user-pf-child-right">
                            <div className='user-pf-actions'>
                                {triggerUpdateById!==editor.id
                                ?
                                <>
                                {
                                editor.user_status === 'deactivated'
                                ?
                                <>
                                    <div style={{display: 'inline-block', color: '#d32f2f'}}><b>Deactivated</b></div> {' '}
                                    <Button disabled={isSubmittingReactivate?true:false} variant="secondary" onClick={()=>handleDeativateUser(editor.id)} size='sm'>{reactivateUserText}</Button>{' '}
                                </>
                                :
                                <>
                                    <Button variant="warning" onClick={()=>handleTriggerUpdate(editor.id, 'select2')} size='sm'>Edit Role</Button>{' '} 
                                    <Button disabled={isSubmittingDeactivate?true:false} variant="danger" onClick={()=>handleDeativateUser(editor.id)} size='sm'>{deactivateUserText}</Button>{' '} 
                                    <Button variant="secondary" onClick={()=>handleVerifyPasswordRemoveUser(editor.id)} size='sm'>Remove</Button>  
                                </>}
                                </>
                                :
                                <>
                                <FormControl>
                                <InputLabel value={inputs.username} onChange={handleInputs} size="small" id="demo-simple-select-label">Role</InputLabel>
                                <Select label='Role' value={updateRole} onChange={(e)=>setUpdateRole(e.target.value)} size="small" name='role' className='data-input-role-update-user' style={{width: '150px'}}>
                                    <MenuItem onClick={()=>setRoleForUpdate('nfoqbehdk283')} value='select1'><div >Admin</div></MenuItem>
                                    <MenuItem onClick={()=>setRoleForUpdate('dbqqajdnbe921')} value='select2'><div >Editor</div></MenuItem>
                                    <MenuItem onClick={()=>setRoleForUpdate('zjeklsnbn323')} value='select3'><div >Moderator</div></MenuItem>
                                </Select>
                                </FormControl>{' '}

                                <Button variant="primary" onClick={()=>handleVerifyPassword(editor.id)} size='sm'>Update</Button>{' '} 
                                <Button variant="secondary" onClick={()=>{setTriggerUpdateById(''); setRoleForUpdate(null); setUserId(null)}} size='sm'>Cancel</Button>  
                                </>
                                }  
                            </div>
                        </div>
                        
                    </div><hr />
                    </div>
                    ))} </>}
                </div>
                }

                {/* Moderators */}
                {moderators.length === 0
                ?
                <div></div>
                :
                <div style={{marginLeft: '5px'}}>
                    <h6>Moderator</h6><hr style={{marginTop: '-5px'}}/>
                    {isPendingModerator?
                    <div
                    style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }} 
                    ><div><Spinner animation="border"/></div></div>
                    :
                    <>
                    {moderators.map((moderator, index)=>(
                    <div key={index}>
                    {/* User Info */}
                    {triggerUserInfo === moderator.id &&<UserInfo id={moderator.id} isOpen={isOpenUserInfo} triggerIsOpenById={triggerUserInfo} setIsOpen={setIsOpenUserInfo}/>}

                    <div className="user-pf-parent">
                        <div className="user-pf-child-left" onClick={()=>handleTriggerUserInfo(moderator.id)}>
                            <div className='user-pf-pic' style={{backgroundImage: `url(${moderator.avatar === null?noPf:ApiKey+'/'+moderator.avatar})`}}></div>
                            <div className="user-pf-text">
                                <div className="user-pf-username"><b>{moderator.username}</b></div>
                                <div className="user-pf-role" style={{fontSize: '10px', color: 'grey'}}>Moderator</div>
                            </div>
                        </div>
                        <div className="user-pf-child-right">
                            <div className='user-pf-actions'>
                                {triggerUpdateById!==moderator.id
                                ?
                                <>
                                {
                                moderator.user_status === 'deactivated'
                                ?
                                <>
                                    <div style={{display: 'inline-block', color: '#d32f2f'}}><b>Deactivated</b></div> {' '}
                                    <Button disabled={isSubmittingReactivate?true:false} variant="secondary" onClick={()=>handleDeativateUser(moderator.id)} size='sm'>{reactivateUserText}</Button>{' '}
                                </>
                                :
                                <>
                                    <Button variant="warning" onClick={()=>handleTriggerUpdate(moderator.id, 'select3')} size='sm'>Edit Role</Button>{' '} 
                                    <Button disabled={isSubmittingDeactivate?true:false} variant="danger" onClick={()=>handleDeativateUser(moderator.id)} size='sm'>{deactivateUserText}</Button>{' '} 
                                    <Button variant="secondary" onClick={()=>handleVerifyPasswordRemoveUser(moderator.id)} size='sm'>Remove</Button>  
                                </>}  
                                </>
                                :
                                <>
                                <FormControl>
                                <InputLabel value={inputs.username} onChange={handleInputs} size="small" id="demo-simple-select-label">Role</InputLabel>
                                <Select label='Role' value={updateRole} onChange={(e)=>setUpdateRole(e.target.value)} size="small" name='role' className='data-input-role-update-user' style={{width: '150px'}}>
                                    <MenuItem onClick={()=>setRoleForUpdate('nfoqbehdk283')} value='select1'><div >Admin</div></MenuItem>
                                    <MenuItem onClick={()=>setRoleForUpdate('dbqqajdnbe921')} value='select2'><div >Editor</div></MenuItem>
                                    <MenuItem onClick={()=>setRoleForUpdate('zjeklsnbn323')} value='select3'><div >Moderator</div></MenuItem>
                                </Select>
                                </FormControl>{' '}

                                <Button variant="primary" onClick={()=>handleVerifyPassword(moderator.id)} size='sm'>Update</Button>{' '} 
                                <Button variant="secondary" onClick={()=>{setTriggerUpdateById(''); setRoleForUpdate(null); setUserId(null)}} size='sm'>Cancel</Button>  
                                </>
                                }  
                            </div>
                        </div>
                        
                    </div><hr />
                    </div>
                    ))} </>}
                </div>
                }
            {AlertDialogSlide(isOpen, body, handleClose)}
            {AlertDialogSlide(isOpenRemoveUser, bodyRemoveUser, handleCloseRemoveUser)}
            </div>
         );
    
}
 
export default ManageUser;