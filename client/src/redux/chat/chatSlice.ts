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

export const createChat = createAsyncThunk('chat/createChat', async () => {
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

export const fetchChats = createAsyncThunk('chat/fetchChats', async () => {
  try {
    const authHeaders = getAuthHeaders();
    const response = await axios.get(`${apiURL}/`, {
      headers: authHeaders,
    });
    toast.success('Fetched chats successfully!');
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch chats. Please try again.');
    throw error;
  }
});

const initialState = {
  chats: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chats.unshift(action.payload);
      })
      .addCase(createChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;