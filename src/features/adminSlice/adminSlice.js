import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUserKey } from "../../api/admin/userkey";
import { ApiKey } from "../../api/apiKey";
import {axios} from 'axios';
import { create } from "@mui/material/styles/createTransitions";



const initialState = {
    users: [],
    adminError: []
}

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        createAdmin: (state, {payload})=>{
            state.users = payload
        },

        storeError: (state, {payload})=>{
            state.adminError = payload
        },
        clearError: (state)=>{
            state.adminError = [];
        }
    },
    extraReducers: {
       
    }
});

export const {createAdmin, storeError, clearError} = AdminSlice.actions;
export default AdminSlice.reducer;

export const getUser = (state)=>state.admin.users;
export const getError = (state)=>state.admin.adminError;