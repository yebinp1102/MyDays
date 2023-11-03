import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserType } from '../../types/User'

// axios.defaults.baseURL = "http://localhost:5000"

type FriendType = {
  _id: string,
  picturePath: string,
  name: string,
  location: string,
  job: string,
}

export interface CounterState {
  isLoading: boolean,
  error: string | null,
  user: UserType | null,
  friends: [FriendType] | null,
}

const initialState: CounterState = {
  isLoading: false,
  error: null,
  user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')!) : null,
  friends: null,
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

export const register = createAsyncThunk('auth/register', async(userInfo : {name: string, email: string, password: string}) => {
  try{
    const {name, email, password} = userInfo
    const res = await axios.post('/auth/register', {name, email, password});
    return res.data;
  }catch(err){
    return getError(err as ApiError);
  }
})

export const login = createAsyncThunk('auth/login', async(userInfo: {email:string, password: string}) => {
  try{
    const {email, password} = userInfo;
    const res = await axios.post('/auth/login', {email, password});
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    return res.data
  }catch(err){
    return getError(err as ApiError);
  }
})

export const logout = createAsyncThunk('auth/logout', async() => {
  localStorage.removeItem('userInfo');
})


export const addRemoveFriend = createAsyncThunk("/users/addRemoveFriend", async({friendId} : {friendId: string}, {getState}) => {
  try{
    const {user} = getState() as any;
    const {token} = user.user;
    const userId = user.user.user._id;
    const res = await axios.get(`users/${userId}/${friendId}`, {headers: {Authorization: `Bearer ${token}`}} )

    const formData = {
      token,
      user: res.data
    }
    localStorage.setItem('userInfo', JSON.stringify(formData));
    return formData;
  }catch(err){
    console.log(err);
    return getError(err as ApiError);
  }
})

export const getFriends = createAsyncThunk("/users/getFriends", async(_, {getState}) => {
  try{
    const {user} = getState() as any;
    const {token} = user.user;
    const id = user.user.user._id;
    const res = await axios.get(`/users/${id}/friends`, {headers: {Authorization: `Bearer ${token}`}});
    return res.data;
  }catch(err){
    console.log(err);
    return getError(err as ApiError);
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers : (builder) => {
      builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })     
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload;
      })     
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(addRemoveFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRemoveFriend.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(addRemoveFriend.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(getFriends.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFriends.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.friends = action.payload;
        state.error = null;
      })
      .addCase(getFriends.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload
      })
  },
})

export default userSlice.reducer