import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {useSelector } from 'react-redux'


const AddItem = () => {

  const [inputs,setInputs] = useState({
    itemName : "",
    quantity : "",
    price : "",
    image : ""
  })

  const [error,setError] = useState({});

  const userId = useSelector(state => state.auth.userId);
  console.log('userId:', userId);

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setInputs({...inputs,[name]: value});
  }


  const validate = (item)=>{

    const error = {};

    if(!/^[A-Za-z\s]+$/.test(item.itemName)){
      error.itemName = 'name containe only alphabetes & spaces'
    }

    if(!/^\d+$/.test(item.quantity)){
      error.quantity = 'Please enter a valid quantity (positive integer)'
    }

    if(!/^\d*\.?\d+$/.test(item.price)){
      error.price = 'Please enter a valid price (number)'
    }

    if(!/^(ftp|http|https):\/\/[^ "]+$/.test(item.image)){
      error.image = 'Please enter a valid image URL'
    }

    return error;
  }



  const handleSubmit=async(e) =>{

    e.preventDefault();

    const newErr = validate(inputs)

    if(Object.keys(newErr).length === 0){
      const item = {itemName, quantity, price, image }
      const res = await axios.post('http://localhost:8000/api/additem',{item,userId:userId})
    }

  }
  



  return (
    <div>
       <Form onSubmit={handleSubmit}>
       <TextField
            margin="normal"
            variant="outlined"
            placeholder="itemName"
            type="text"
            name= "name"
            value={inputs.itemName}
            onChange={handleChange}
          />  
          <TextField
            margin="normal"
            variant="outlined"
            placeholder="quantity"
            type="number"
            name="quantity"
            value={inputs.quantity}
            onChange={handleChange}
          />  
          <TextField
            margin="normal"
            variant="outlined"
            placeholder="price"
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
          />
      
           <TextField
            margin="normal"
            variant="outlined"
            placeholder="image"
            type="url"
            name="image"
            value={inputs.image}
            onChange={handleChange}
          />

          <Button type='submit'> Add item </Button>
          </Form>
    </div>
  )
}

export default AddItem
