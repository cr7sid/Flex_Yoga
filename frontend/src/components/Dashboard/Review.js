import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const products = [
  {
    name: 'Yoga subscription',
    price: 'Rs. 500',
  },

];

export default function Review({ batch, user }) {

  const navigate = useNavigate()

  const handlePayment = async () => {
    const { _id } = user
    try {
      const res = await axios.get('/api/user/payment', {
        params: {
          id: _id,
          batch
        }
      })

      localStorage.setItem('user', JSON.stringify(res.data.data))
      console.log(res.data.data)
      window.location.reload()

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Rs. 500
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Subscription
          </Typography>
          <Typography gutterBottom>Selected Batch - {batch}</Typography>

          <Typography gutterBottom>{user?.name}</Typography>
          <Typography gutterBottom>{user?.phone_number}</Typography>

        </Grid>
      </Grid>
      <Button onClick={handlePayment} variant="contained" sx={{ mt: 3, ml: 1 }}>Pay Now</Button>
    </React.Fragment>
  );
}