import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLogin } from '../../services/auth'

export const fetchAuth = createAsyncThunk(
  'auth/fetchUserData',
  async (params) => {
    return fetchLogin(params)
  }
)

const initialState = {
  data: null,
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.data = action.payload
      console.log(action.payload)
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error'
      state.data = null
    },
  },
})

export const authReducer = authSlice.reducer
