import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { Route, Routes } from "react-router";
import './App.css';
import HomePage from './components/HomePage/HomePage.js';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Admin from './components/Users/Admin';
import Instructor from './components/Users/Instructor';
import Learner from './components/Users/Learner';
import { AUTH_LINK, LINK_ADMIN, LINK_HOME, LINK_INSTRUCTOR, LINK_LEARNER, LINK_LOGIN, LINK_SIGNUP } from './Constants';

function App() {
  return (
    
    <Router>
        <Routes>
  
          <Route path='/' element={<HomePage />} />
          <Route path={LINK_HOME} element={<HomePage />} />

          <Route path={AUTH_LINK} element={<Navigate to={LINK_LOGIN} />} />
          <Route path={LINK_LOGIN} element={<LoginSignup />} />  
          <Route path={LINK_SIGNUP} element={<LoginSignup />} />  

          <Route path={LINK_LEARNER} element={<Learner />} />
          {/* <Routes> */}
          <Route path={`${LINK_INSTRUCTOR}/*`} element={<Instructor />} />
          {/* </Routes> */}
          
          <Route path={LINK_ADMIN} element={<Admin />} />

          <Route path='*' element={<div>NOT FOUND 404</div>} />
              
       </Routes>
    </Router>

  );
}

export default App;
