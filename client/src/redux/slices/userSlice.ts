import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserType } from '../../types/User'

// axios.defaults.baseURL = "http://localhost:5000"

export interface CounterState {
  isLoading: boolean,
  error: string | null,
  user: UserType | null,
}

const initialState: CounterState = {
  isLoading: false,
  error: null,
  user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')!) : null,
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


export const addRemoveFriend = createAsyncThunk("/users/addRemoveFriend", async(data : {userId: string | undefined, friendId: string}, {getState}) => {
  try{
    const {user} = getState() as any;
    const token = user.user.token;
    const {userId, friendId} = data;
    const res = await axios.post(`users/${userId}/${friendId}`, { headers: {Authorization: `Bearer ${token}`}} )
    console.log(res.data);
    // localStorage.setItem('userInfo', JSON.stringify(res.data));
    return res.data;
  }catch(err){
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
        // state.user = action.payload;
        state.error = null;
      })
      .addCase(addRemoveFriend.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      })
  },
})

export default userSlice.reducer