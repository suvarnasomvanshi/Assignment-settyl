import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error,setError] = useState()

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      const data = res.data;
      return data;
    } catch (err) {
      setError(err); // Handle error setting in state
      return null; // Return null or handle the error case according to your logic
    }
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/login"));
  };

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
          <Typography variant="h3">Signup</Typography>

          <TextField
            margin="normal"
            variant="outlined"
            placeholder="name"
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            variant="outlined"
            placeholder="email"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            variant="outlined"
            placeholder="password"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />

        

          <Button variant="contained" type="submit">
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
