import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, fabClasses } from '@mui/material';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Review from './Review';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const batchMap = {
  1 : "6AM-7AM",
  2 : "7AM-8AM",
  3 : "8AM-9AM",
  4 : "5PM-6PM",
}

export default function Dashboard() {

  const [open, setOpen] = React.useState(false);
  const [secondModal,setSecondModal] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [batch,setBatch] = React.useState(1)

  const navigate = useNavigate()
  const [user,setUser] = React.useState(null)


  
  const isActive = () => {
    const d = new Date();
    const sub_time = user?.subscription_time;
      if(sub_time){
        const sub_date = new Date()
        return sub_date.getMonth() === d.getMonth() && sub_date.getFullYear() === d.getFullYear()
      }
    return false
  }

  const handleLogout = () =>{
    localStorage.removeItem('user');
    window.location.reload();
  }


  React.useEffect(()=>{
    var loggedInUser = localStorage.getItem('user')
    console.log(loggedInUser)
    if(loggedInUser) {
      loggedInUser = JSON.parse(loggedInUser)
      setUser(loggedInUser)
      setBatch(loggedInUser.batch)
     }
    else 
      navigate('/')
  },[])


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            YogaFlex
          </Typography>
        </Toolbar>
        {/* <Button variant='secondary' onClick = {()=>{
          localStorage.removeItem('user')
        }} > Log out </Button> */}
      </AppBar>
      <h1> Hi {user?.name}</h1>
      <Accordion style={{marginLeft:"5%", marginRight:"5%", marginTop:"5%"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Subscription Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {user?.subscription_time && <>
            Last Subscription Time : {new Date(user.subscription_time).toString()}</>}
          </Typography>
          <Typography>
            Subscription Status : {isActive() ? "Active" : "Inactive"}
            </Typography>
            <Typography>
            Current Batch : { batchMap[user?.batch] }
            </Typography>
        </AccordionDetails>
      </Accordion>
      <Button onClick={handleOpen} variant="contained" sx={{ mt: 3, ml: 1 }} disabled={isActive()}>Subscribe</Button>
      <Button onClick={handleLogout} variant="contained" sx={{ mt: 3, ml: 1 }} >Logout</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pay Now
          </Typography>
          <FormControl style={{marginTop:"5%"}}>
      <FormLabel id="demo-row-radio-buttons-group-label">Choose batch</FormLabel>
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
      <Button onClick={()=>setSecondModal(true)} variant="contained" sx={{ mt: 3, ml: 1 }}>Continue</Button>
    </FormControl>
        </Box>
      </Modal>
      <Modal 
        open={secondModal}
        onClose={()=>setSecondModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
           <Box sx={style}>
        <Review batch={batch} user={user}/>
           </Box>
             
      </Modal>
    </Box>
  );
}
