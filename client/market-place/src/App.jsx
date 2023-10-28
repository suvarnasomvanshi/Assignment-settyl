import { useState } from 'react';
import {Routes,Route} from "react-router-dom"
import Headers from './assets/Headers';
import Login from "./assets/Login";
import Signup from './assets/Signup';
import Home from "./assets/Home";
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
