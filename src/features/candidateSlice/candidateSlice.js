import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    candidateAuth: '',
    fbToken: '',
    fbAvatar: '',
    candidateInformation: [''],
}

export const CandidateSlice = createSlice({
        initialState,
        name: 'candidate',
        reducers: {
            setCandidateAuth: (state, {payload})=>{
                state.candidateAuth = payload;
            },
            setFbToken: (state, {payload})=>{
                state.fbToken = payload;
            },
            setfbAvatar: (state, {payload})=>{
                state.fbAvatar = payload;
            },
            setCandidateInformation: (state, {payload})=>{
                state.candidateInformation = payload;
            }
        }
    }
);

export const {
    setCandidateAuth,
    setFbToken,
    setfbAvatar,
    setCandidateInformation
} = CandidateSlice.actions;

export default CandidateSlice.reducer;

export const getCandidateAuth = (state)=>state.candidate.candidateAuth;
export const getFbToken = (state)=>state.candidate.fbToken;
export const getfbAvatar = (state)=>state.candidate.fbAvatar;
export const getCandidateInformation = (state)=> state.candidate.candidateInformation;