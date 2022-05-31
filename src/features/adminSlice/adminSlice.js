import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUserKey } from "../../api/admin/userkey";
import { ApiKey } from "../../api/apiKey";
import axios from 'axios';
import { create } from "@mui/material/styles/createTransitions";
import { config } from "@fortawesome/fontawesome-svg-core";

export const asyncCheckAuth = createAsyncThunk('admin/asyncCheckAuth',async (token)=>{

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.get(`${ApiKey}/api/user/checkAuth`,config)
    
    return response.data;

   
});

const initialState = {
    users: [],
   
    auth_username: '',
    auth_token: '',
    registerError: '',
    loginError: [],
}

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        createAdmin: (state, {payload})=>{
            state.users = payload
        },
        storeRegisterError: (state, {payload})=>{
            state.registerError = payload;
        }
        ,
        storeLoginError: (state, {payload})=>{
            state.loginError = payload
        },
        clearError: (state)=>{
            state.loginError = [];
            state.registerError= [];
        },
        setAuthUsername: (state, {payload})=>{
            state.auth_username = payload;
        },
        setAuthtoken: (state, {payload})=>{
            state.auth_token = payload;
        },
        
    },
    extraReducers: {
       [asyncCheckAuth.fulfilled]: (state, {payload})=>{
            
           
       },
       [asyncCheckAuth.rejected]: (state, {payload})=>{
          
            
       }

    }
});

export const {
    createAdmin, 
    storeRegisterError, 
    storeLoginError, 
    clearError,
    setAuthUsername,
    setAuthtoken,
} = AdminSlice.actions;
export default AdminSlice.reducer;

export const getUser = (state)=>state.admin.users;
export const getLoginError = (state)=>state.admin.loginError;
export const getRegisterError =(state)=>state.admin.registerError;
export const getAuthUsername = (state)=>state.admin.auth_username;
export const getAuthToken = (state)=>state.admin.auth_token;
export const getCheckAuth = (state)=>state.admin.checkAuth;