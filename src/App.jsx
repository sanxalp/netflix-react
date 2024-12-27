import React, { useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import "./App.css";
import { auth } from "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./app/userSlice";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //Logged in
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
          })
        );
      } else {
        //Logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route exact path="/profile" element={<ProfileScreen />} />
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
