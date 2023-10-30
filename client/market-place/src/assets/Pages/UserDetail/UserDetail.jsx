import { Box, Typography ,Card, CardContent,Grid,CardMedia,} from '@mui/material'
import React from 'react';
import { useSelector } from 'react-redux';
import store  from '../../store';



const UserDetail = () => {

const userDetail = useSelector(state=>state.auth.userDetail)
console.log(userDetail)
    
  return (
    <div>
    <Card>
      <CardContent>
        <Typography variant="h5">User Details</Typography>
       
        <Typography variant="body1">
          <strong>Name:</strong> {userDetail.name}
        </Typography>

        <Typography variant="body1">
          <strong>Email:</strong> {userDetail.email}
        </Typography> 
      </CardContent>
    </Card>

    <card>
    <Grid container spacing={2}>
      {userDetail.itemList.map(item => (
        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={item.image}
              
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Quantity: {item.quantity}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Price: {item.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    </card>
    </div>
  )
}

export default UserDetail
