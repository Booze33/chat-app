import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const userObject = JSON.parse(localStorage.getItem('user'));
const userId = userObject.data.id;
const apiURL = `http://localhost:3001/users/${userId}/chats`;

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('sessionUID');

  return {
    'access-token': accessToken,
    client,
    uid,
  };
};

export const addFriend = createAsyncThunk('chat/addFriend', async () => {
  try {
    const authHeaders = getAuthHeaders();
    const response = await axios.post(`${apiURL}/`, {}, {
      headers: authHeaders,
    });
    toast.success('Chat created successfully!');
    return response.data;
  } catch (error) {
    toast.error('Failed to create chat. Please try again later.');
    throw error;
  }
});

const initialState = {
  friendList: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFriend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.chats.unshift(action.payload);
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default chatSlice.reducer;