import { useState } from 'react';
import {Routes,Route} from "react-router-dom"
import Headers from './assets/Pages/Headers';
import Login from "./assets/Pages/Login";
import Signup from './assets/Pages/Signup';
import Home from './assets/Pages/HomePage/Home';
import UserDetail from './assets/Pages/UserDetail/userDetail';
import { useSelector } from "react-redux";
import AddItem from './assets/Pages/UserDetail/AddItem';


function App() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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

            <Route  path="/userdetail" element={<UserDetail/>} />
            <Route  path="/addItem" element={<AddItem/>} />
           {/*} <Route  path="/login" element={<Login/>} /> */}
          </Routes>
        </main>

    </>
  )
}

export default App
