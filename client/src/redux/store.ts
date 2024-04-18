import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import chatReducer from './chat/chatSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;
