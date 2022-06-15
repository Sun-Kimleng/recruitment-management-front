import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    'job': [],
}

export const JobSlice = createSlice({
    'name': 'job',
    initialState,
    reducers: {
        storeJob: (state, {payload})=>{
            state.job = payload;
        },
    }

});

export const {
    storeJob
} = JobSlice.actions;

export default JobSlice.reducer;

export const getJob = (state)=>state.job.job;