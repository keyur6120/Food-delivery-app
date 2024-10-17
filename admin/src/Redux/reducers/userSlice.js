import {createSlice} from '@reduxjs/toolkit'
import { updateUser } from '../../../../client/src/redux/reducers/UserSlice'


const initialState={
    currentUser :null,
 
}

export const userSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        getID:(state,action)=>{
            state.currentUser = action.payload.user;
        }
    }
})

export const {getID} = userSlice.actions

export default userSlice.reducer;