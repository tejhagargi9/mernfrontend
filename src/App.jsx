import React from 'react';
import Navbar from './Components/navbar';
import {BrowserRouter, Router, Route, Routes} from 'react-router-dom';
import Create from './Components/Create'
import Read from './Components/Read'
import Update from './Components/Update'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element = {<Create/>} />
        <Route exact path="/allpost" element = {<Read/>} />
        <Route path="/:id" element = {<Update/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
