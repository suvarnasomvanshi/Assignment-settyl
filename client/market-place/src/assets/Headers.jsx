import React,{useState} from 'react'
import {AppBar,Toolbar,Typography,Box, Tabs, Tab} from "@mui/material"

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
                        <Tab label="Login" />
                        <Tab label="SignUp" />
                        <Tab label="Logint" />
                    </Tabs>
                </Box>
            </Toolbar>
          </AppBar>
    </div>
  )
}

export default Headers
