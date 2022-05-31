import { useSelector } from "react-redux"
import { getAuthToken } from "../features/adminSlice/adminSlice"

export const apiHeaders= {
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    }}

