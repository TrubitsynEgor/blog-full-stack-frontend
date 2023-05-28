import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLogin, fetchMe, fetchReg } from '../../services/auth'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  return fetchLogin(params)
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  return fetchMe()
})
export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params) => {
    return fetchReg(params)
  }
)

const initialState = {
  data: null,
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.data = null
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.data = action.payload
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error'
      state.data = null
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.data = action.payload
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'error'
      state.data = null
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.data = action.payload
    },
    [fetchRegister.rejected]: (state) => {
      state.status = 'error'
      state.data = null
    },
  },
})

export const isAuthSelector = (state) => !!state.auth.data
export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
