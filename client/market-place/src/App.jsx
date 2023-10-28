import { useState } from 'react';
import {Routes,Route} from "react-router-dom"
import Headers from './assets/Headers';
import Login from "./assets/Login";
import Signup from './assets/Home';
import Home from "./assets/Home";




function App() {
  
  return (
    <>
        <header>
            <Headers/>
        </header>

        <main>
          <Routes>
            <Route  path="/login" element={<Login/>} />
            <Route  path="/signup" element={<Signup/>} />
             <Route  path="/home" element={<Home/>} />
            {/*<Route  path="/login" element={<Login/>} />
            <Route  path="/login" element={<Login/>} />
            <Route  path="/login" element={<Login/>} /> */}
          </Routes>
        </main>

    </>
  )
}

export default App
