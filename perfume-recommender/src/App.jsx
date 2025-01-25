import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes } from 'react-router';
import Recommend from './components/Recommend';
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
