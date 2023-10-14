import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Chatbot from './components/Chatbot';
import Home from './components/Home';
import NavBar from './components/NavBar';
import CreatePost from './components/CreatePost';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Portal from './components/Portal';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const navbarPaths = [
    '/createpost',
    '/portal',
    '/chatbot'
     
  ];

  const shouldRenderNavbar = navbarPaths.some((path) => window.location.pathname.startsWith(path));

  return (
    <Router>
      {shouldRenderNavbar && <NavBar />} {/* Conditional rendering of Navbar */}
      <Routes>
      <Route path="/*" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/portal" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Portal />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

render(<App />, document.getElementById('root'));