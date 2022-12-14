import './App.css';
import Login from './components/LoginScreen/Login';
import Dashboard from './components/Dashboard/Dashboard';
import SignUp from './components/FormScreen/SignUp';
import {
 Routes,Route
} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<Login/>}/>

      </Routes>
      {/* <Login /> */}
      {/* <Dashboard /> */}
     
    </div>
  );
}

export default App;
