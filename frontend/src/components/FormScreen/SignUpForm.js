import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import validator from 'validator'

export default function SignUpForm({name,lname,email,pass,age,contact,batch,setName,setlName,setEmail,setPass,setAge,setContact,setBatch}) {

  // const [name,setName] = React.useState("");
  // const [lname,setlName] = React.useState("");
  // const [email,setEmail] = React.useState("");
  // const [pass,setPass] = React.useState("");
  // const [age,setAge] = React.useState("");
  // const [contact,setContact] = React.useState(""); 
  // const [batch,setBatch] = React.useState("");
  // const [emailError, setEmailError] = React.useState('')

  // const validateEmail = (e) => {
  //   var email = e.target.value
  
  //   if (validator.isEmail(email)) {
  //     setEmailError('Valid Email :)')
  //   } else {
  //     setEmailError('Enter valid Email!')
  //   }
  // }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom style={{marginTop:"10%"}}>
        Customer Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            
            variant="standard"
            value={lname}
            onChange={event => setlName(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            autoComplete="email"
            variant="standard"
             value={email}
            onChange={event => setEmail(event.target.value)}
            
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            autoComplete="password"
            variant="standard"
             value={pass}
            onChange={event => setPass(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="age"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
             value={age}
            onChange={event => setAge(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="contact"
            name="contact"
            label="Contact No"
            type="number"
            fullWidth
            variant="standard"
             value={contact}
            onChange={event => setContact(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} >
          <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Batches</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={batch}
        onChange={(e)=>setBatch(e.target.value)}
      >
        <FormControlLabel value="1" control={<Radio />} label="6AM-7AM" />
        <FormControlLabel value="2" control={<Radio />} label="7AM-8AM" />
        <FormControlLabel value="3" control={<Radio />} label="8AM-9AM" />
        <FormControlLabel value="4" control={<Radio />} label="5PM-6PM" />
         
      </RadioGroup>
    </FormControl>
   
        </Grid>
      </Grid>
    </React.Fragment>
  );
}