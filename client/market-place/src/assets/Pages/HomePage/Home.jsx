import axios from "axios";
import React, { useEffect, useState } from "react";
import {Box, TextField, Typography} from "@mui/material";



axios.defaults.withCredentials = true;

const Home = () => {
  const [user, setUser] = useState();
  const [products,setProducts] = useState([]);
  const [search,setSearch] = useState('');


console.log(products)
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8000/api/user",{ withCredentials: true })
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


const handleSearch =(e)=>{
  setTimeout(()=>{
     setSearch(e.target.value)
  },2000)
}
  
  // <Typography variant="h3"> {user && <h2>{user.name}</h2>}</Typography>

  
  

  return(
    <>   
    
    <Box 
    marginTop={8}
    placeholder="Search product"
    display="flex"
    marginLeft="auto"
    marginRight="auto"
    flexDirection={"column"}
    justifyContent="center"
    alignItems="centre"
    width={1000}
    >
      <TextField 
    placeholder="Search product"
    display="flex"
    marginLeft="auto"
    marginRight="auto"
    flexDirection={"column"}
    justifyContent="center"
    alignItems="centre"
    width={300}
    onChange={(e)=>handleSearch(e)}

  />



<Box  sx={{display:'flex', flexWrap:'wrap',marginTop:'5%', border: '1px solid #ccc',width:'100%'}} >
  {products.filter((product)=>{
    return product.name.toLowerCase().includes(search.toLowerCase())
  })
  
  .map((product)=>(
    <Box sx={{display:'flex', flexWrap:'wrap',marginTop:'5%',marginLeft:'5%',border: '1px solid #ccc',width:'40%',maxHeight:'200px'}} >

    <Box sx={{maxWidth:'40%'}}><img src={product.image} alt='Product' style={{ width: '100%', height:'55%'}}/></Box>
      
      <Box sx={{marginLeft:'auto',marginRight:'auto',maxWidth:'40%'}}>
      <Typography variant="h6">Item : {product.name}</Typography>
      <Typography>No of Item : {product.quantity}</Typography>
      <Typography> Price : {product.price}</Typography>
      </Box>

    </Box>
  ))
  
  }
</Box>

</Box>



    </>
  )
  
};

export default Home;
