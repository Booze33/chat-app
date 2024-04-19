import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../../redux/chat/chatSlice';

const ChatList = () => {
  const dispatch = useDispatch();
  const { chats, loading } = useSelector((state) => state.chat);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const userChats = chats.filter((chat) => chat.creator_id === user.data.id);

  return (
    <div>
      <h1>Chats</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {userChats.map((chat) => (
            <Link to={`chat/${chat.id}`} key={chat.id}>chat {chat.id}</Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;