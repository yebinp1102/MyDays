import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PostType } from "./postSlice";

export type ProfileType = {

}

export interface ProfileState {
  isLoading: boolean,
  error: string | null,
  profile: ProfileType | null,
  posts: PostType | null
}

const initialState : ProfileState = { 
  isLoading: false,
  error: null,
  profile: null,
  posts: null
}

declare type ApiError = {
  message: string,
  response: {
    data: {message: string}
  }
} 

const getError = (err : ApiError) => {
  return err.response && err.response.data.message ? err.response.data.message : err.message
}

export const getUserProfile = createAsyncThunk("/profile/get", async({id}: {id: string}, {getState}) => {
  try{
    const {user} = getState() as any;
    const token = user.user.token;
    const res = await axios.get(`/users/${id}`, {headers: {Authorization: `Bearer ${token}`}})
    return res.data;
  }catch(err){
    console.log(err);
    return getError(err as ApiError);
  }
})




export const profileSlice = createSlice({
  name:"profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUserProfile.fulfilled, (state, action:PayloadAction<any>) => {
      state.isLoading = false;
      state.profile = action.payload;
    })
    .addCase(getUserProfile.rejected, (state, action:PayloadAction<any>) => {
      state.isLoading =false;
      state.error = action.payload;
      state.profile = null;
    })
  }
})

export default profileSlice.reducer;