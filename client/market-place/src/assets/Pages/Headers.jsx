import React,{useState} from 'react';
import {AppBar,Toolbar,Typography,Box, Tabs, Tab} from "@mui/material";
import { Link } from 'react-router-dom';

const Headers = () => {
    const [value,setValue] = useState();

  return (
    <div>
          <AppBar position='sticky'>
            <Toolbar>
                <Typography variant="h4">MarketPlace</Typography>
                <Box sx={{
                    marginLeft:'auto'
                }}>
                    <Tabs 
                    onChange={(e,val)=>setValue(val)} 
                    value={value} 
                    textColor='inherit'
                    indicatorColor='secondary'
                    >
                        <Tab label="SignUp" to="/" LinkComponent={Link}/>
                        <Tab label="Login" to="/login" LinkComponent={Link}/>
                        <Tab label="userDetail" to="/userdetail" LinkComponent={Link} />
                        
                    </Tabs>
                </Box>
            </Toolbar>
          </AppBar>
    </div>
  )
}

export default Headers
