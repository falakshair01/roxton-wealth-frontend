import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk
} from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

// ---- Types ----
export type User = {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loaded: boolean;
};

// Define the AppState type for selectors
type AppState = {
  auth: AuthState;
} & {
  _persist?: {
    version: number;
    rehydrated: boolean;
  };
};

// ---- Initial State ----
const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
  loaded: false
};

// ---- Thunks ----
export const signUp = createAsyncThunk<
  { user: User; token: string },
  {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio?: string;
  },
  { rejectValue: string }
>('auth/signUp', async (payload, { rejectWithValue }) => {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';
    const res = await fetch(`${base}/api/v1/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data?.message || 'Registration failed');
    return data;
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Network error');
  }
});

export const signIn = createAsyncThunk<
  { user: User; access_token: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/signIn', async (payload, { rejectWithValue }) => {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';
    const res = await fetch(`${base}/api/v1/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data?.message || 'Login failed');
    return data;
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Network error');
  }
});

// ---- Slice ----
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Sign Up
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log('SignUp fulfilled with payload:', action.payload);
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Sign up failed';
      })

      // Sign In
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log('SignIn fulfilled with payload:', action.payload);
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.error = null;
        state.loaded = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
        state.loaded = true;
      })

      // Handle rehydration
      .addCase(REHYDRATE as any, (state) => {
        state.loaded = true;
      });
  }
});

// Export actions
export const { logout } = authSlice.actions;

// Selectors
export const selectAuthStatus = (state: AppState) => state.auth.status;
export const selectAuthError = (state: AppState) => state.auth.error;
export const selectCurrentUser = (state: AppState) => state.auth.user;
export const selectToken = (state: AppState) => state.auth.token;
export const selectIsSignedIn = (state: AppState) =>
  Boolean(state.auth.token || state.auth.user);
export const selectAuthLoaded = (state: AppState) => state.auth.loaded;
export const selectAuth = (state: AppState) => state.auth;

export const signOut = logout;

export default authSlice.reducer;
