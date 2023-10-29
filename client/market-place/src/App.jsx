import { useState } from 'react';
import {Routes,Route} from "react-router-dom"
import Headers from './assets/Pages/Headers';
import Login from "./assets/Pages/Login";
import Signup from './assets/Pages/Signup';
import Home from "./assets/Pages/HomePage/Home";
import { useSelector } from "react-redux";


function App() {

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  
  return (
    <>
        <header>
            <Headers/>
        </header>

        <main>
          <Routes>
            <Route  path="/login" element={<Login/>} />
            <Route  path="/" element={<Signup/>} />
            {isLoggedIn && <Route path="/user" element={<Home/>} />}{" "}

            {/*<Route  path="/login" element={<Login/>} />
            <Route  path="/login" element={<Login/>} />
            <Route  path="/login" element={<Login/>} /> */}
          </Routes>
        </main>

    </>
  )
}

export default App
