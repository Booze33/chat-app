import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Signup from './components/auth/signUp';
import Signin from './components/auth/signIn';
import Home from './components/pages/Home';
import { setUser } from './redux/auth/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUID = localStorage.getItem('sessionUID');
    if (storedUID) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      dispatch(setUser({ uid: storedUID, ...storedUser }));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/sign_in" element={<Signin />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
