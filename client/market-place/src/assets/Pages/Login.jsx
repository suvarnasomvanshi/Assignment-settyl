import { TextField, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:8000/api/login", {
        email: inputs.email,
        password: inputs.password,
      })

      .catch((err) => console.log(err));
      const data = await res.data;
      return data;
  };


  // const sendRequest = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:8000/api/login", {
  //       email: inputs.email,
  //       password: inputs.password,
  //     });
  //     return res.data; // Return the entire response for further processing
  //   } catch (err) {
  //     console.error("Error occurred:", err);
  //     throw err; // Throw the error to be caught in the calling function
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
    //.then(() => dispatch(authActions.login()))
    // .then(() => navigate("/user"));
    .then((datas) => {    
      const data = datas.user 
      if (data) {
        dispatch(authActions.login({ userDetail: data })); 
        navigate("/user");
      } else {
        console.log("Login failed. Please check your credentials.");
      }
    })
    .catch((error)=>{
      console.error("Error occurred:", error);
    })
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await sendRequest();
  //     if (data) {
  //       const user = data.user
  //       dispatch(authActions.login({ userDetail: user }));
  //       navigate("/user");
  //     } else {
  //       console.log("Login failed. Please check your credentials.");
  //     }
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //   }
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="centre"
          width={300}
          marginLeft="auto"
          marginRight="auto"
          marginTop={5}
        >
          <Typography variant="h3">login</Typography>

          <TextField
            margin="normal"
            variant="outlined"
            placeholder="email"
            name="email"
            type="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            variant="outlined"
            placeholder="password"
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleChange}
          />

          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
