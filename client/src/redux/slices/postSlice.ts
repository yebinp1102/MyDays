import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type PostType = {
  _id?: string,
  userId?: string,
  postId?: string,
  postUserId?: string,
  name: string,
  location: string,
  description: string,
  picturePath: string,
  userPicturePath: string,
  likes: Object,
  comments: [string],
}

export interface PostState {
  isLoading: boolean,
  posts: [PostType] | null,
  error: string | null,
}

const initialState: PostState = {
  isLoading: false,
  posts: null,
  error : null
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

export const getPosts = createAsyncThunk('/posts/getAll', async(_, {getState}) => {
  try{
    const {user} = getState() as any;
    const token = user.user.token;
    const res = await axios.get(
      '/posts', {headers: {Authorization: `Bearer ${token}`}}
    )
    return res.data;
  }catch(err){
    return getError(err as ApiError);
  }
})

export const LikePost = createAsyncThunk('/posts/like', async(bodyData: {postId:string, userId:string}, {getState}) => {
  try{
    const {postId, userId} = bodyData;
    const {user} = getState() as any;
    const token = user.user.token;
    const res = await axios.post(`/posts/${postId}/like`, {userId}, {headers: {Authorization: `Bearer ${token}`}})
    return res.data;
  }catch(err){
    console.log(err);
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
    .addCase(getPosts.pending, (state) =>{
      state.isLoading = true
    })
    .addCase(getPosts.fulfilled, (state, action: PayloadAction<any>) =>{
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    })
    .addCase(getPosts.rejected, (state, action: PayloadAction<any>) =>{
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(LikePost.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(LikePost.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error=null;
    })
    .addCase(LikePost.rejected, (state, action: PayloadAction<any>) =>{
      state.isLoading = false;
      state.error = action.payload;
    })
    
  }
})

export default postSlice.reducer