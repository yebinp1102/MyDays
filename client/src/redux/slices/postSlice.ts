import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface PostState {
  isLoading: boolean,
}

const initialState: PostState = {
  isLoading: false
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

export const createPost = createAsyncThunk('/posts/create', async(formData :Object, {getState}) => {
  try{
    const {user} = getState() as any;
    const token = user.user.token;
    const res = await axios.post(
      '/posts', formData, {headers: {Authorization: `Bearer ${token}`}}
    ) 
    return res.data;
  }catch(err){
    return getError(err as ApiError);
  }
})


export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createPost.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createPost.fulfilled, (state) => {
      state.isLoading = false;
    })
  }
})