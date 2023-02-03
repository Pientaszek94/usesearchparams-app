import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import { Home } from './pages';

function App() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-between items-center'>
      <Router>
        <div className='text-blue-300 font-bold italic w-full p-2'>COLOR PALETTE</div>
        <Routes>

            <Route path='/' element={<Navigate to="/products"/>}/>
            <Route path='/products' element={<Home/>}/>

        </Routes>
        <div className='w-full h-20 shadow-inner centred-col'>PWL 2023</div>
      </Router>
    </div>
  );
}

export default App;
