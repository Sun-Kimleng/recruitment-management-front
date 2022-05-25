import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUserKey } from "../../api/admin/userkey";
import { ApiKey } from "../../api/apiKey";
import {axios} from 'axios';
import { create } from "@mui/material/styles/createTransitions";



const initialState = {
    users: [],
}

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        createAdmin: (state, {payload})=>{
            state.users = payload
        }
    },
    extraReducers: {
       
    }
});

export const {createAdmin} = AdminSlice.actions;
export default AdminSlice.reducer;

export const getUser = (state)=>state.admin.users;