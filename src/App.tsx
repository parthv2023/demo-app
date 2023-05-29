import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddData from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Charpage from './pages/chartPage';
import Home from './pages/home';
import Edituser from './pages/editData';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<AddData />} />
          <Route path="/chatpage" element={<Charpage />} />
          <Route path="/edituser/:id" element={<Edituser/>} />
        </Routes>
        {/* <AddData /> */}
    </div>
  );
}

export default App;
