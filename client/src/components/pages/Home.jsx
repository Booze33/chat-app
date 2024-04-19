import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChat } from '../../redux/chat/chatSlice';
import ChatList from './getChat';

const Home = () => {
  const dispatch = useDispatch();
  
  const handleClick = async () => {
    try {
      await dispatch(createChat());
    } catch (error) {
      console.error('Error creating chat:', error);
    }
    console.log('clicked');
  };

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.data.id);

  return (
    <div>
      <ChatList />
      <div>
        <button onClick={handleClick}>Create Chat</button>
      </div>
    </div>
  );
};

export default Home;
