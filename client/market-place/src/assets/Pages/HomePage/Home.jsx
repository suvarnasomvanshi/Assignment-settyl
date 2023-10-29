import axios from "axios";
import React, { useEffect, useState } from "react";
import AddItem from "./AddItem"
import {Box, TextField, Typography} from "@mui/material";

axios.defaults.withCredentials = true;

const Home = () => {
  const [user, setUser] = useState();
  const [products,setProducts] =useState([]);

console.log(products)
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8000/api/user", { withCredentials: true })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);


  useEffect(() => {
  
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/allitemlist'); // Replace with your API endpoint
        setProducts(response.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
   
      }
    };

    fetchProducts();
  }, []);

  return
  
       <div>
        <Typography> {user && <h2>{user.name}</h2>}</Typography>
        <TextField 
          placeholder="Search product"
          display="flex"
          marginLeft="auto"
          marginRight="auto"
          marginTop={5}
          flexDirection={"column"}
          justifyContent="center"
          alignItems="centre"
          width={300}
         
        />

        <Box>

          {products.length ===0 ? (
            <p>No products available</p>
          ):(
            <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Quantity: {product.quantity}</p>
              <p>Price: {product.price}</p>
              <img src={product.image} alt={product.name} style={{ width: '100px' }} />
            </li>
          ))}
        </ul>
          )}
        </Box>
         
         </div>;
  
};

export default Home;
