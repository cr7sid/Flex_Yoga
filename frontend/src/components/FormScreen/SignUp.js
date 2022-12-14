import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUpForm from './SignUpForm';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        YogaFlex
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const theme = createTheme();

export default function SignUp() {

const navigate = useNavigate();

   const [name,setName] = React.useState("");
  const [lname,setlName] = React.useState("");
  const [email,setEmail] = React.useState("");
  const [pass,setPass] = React.useState("");
  const [age,setAge] = React.useState("");
  const [contact,setContact] = React.useState(""); 
  const [batch,setBatch] = React.useState("");

React.useEffect(()=>{
  const loggedin = localStorage.getItem('user')
 
  if(loggedin) navigate('/dashboard')
})

  const handleSubmit = async (e) => {
    e.preventDefault()
   try {
    const res = await axios.post('/api/user/cr_user',{
      name: name + ' ' + lname,
      email: email,
      password: pass,
      phone_number: contact,
      batch: batch,
      age: age
  })

  const data = res.data;
  localStorage.setItem('user',JSON.stringify(data.data));

  navigate('/dashboard')

   } catch (error) {
     console.log(error)
   }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            YogaFlex
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Welcome to YogaFlex
          </Typography>
          
          
            <React.Fragment>
              <form onSubmit={handleSubmit}>

                <SignUpForm name={name} setName={setName} lname={lname} setlName={setlName} email={email} setEmail={setEmail} pass={pass} setPass={setPass} age={age} setAge={setAge} contact={contact} setContact={setContact} batch={batch} setBatch={setBatch}/>
{/* {console.log(name)} */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                

                <Button
                  variant="contained"
                  
                  type='submit'
                  sx={{ mt: 3, ml: 1 }}
                  >
                   Sign Up
                </Button>
              </Box>
                  </form>
            </React.Fragment>
          
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}