import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css'
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Home from './components/screens/Home'
import Signup from './components/screens/Signup'
import Signuppro from './components/screens/Signuppro'
import Login from './components/screens/Login'
import LoginPro from './components/screens/Loginpro'
import Service from './components/screens/Service'
import Reset from './components/screens/Reset'
import UserHome from './components/screens/UserHome'
import ProHome from './components/screens/ProHome'

import NewPassword from './components/screens/Newpassword'
import ProfilePro from './components/screens/Profilepro'
import { reducer, initialState } from './reducers/userReducer'
import UserService from './components/screens/UserService';
import Admin from './components/screens/Admin';
import AdminLogin from './components/screens/AdminLogin';
import Carpenter from './components/screens/Carpenter';
import UserCarpenter from './components/screens/UserCarpenter';
import Plumber from './components/screens/Plumber';
import UserPlumber from './components/screens/UserPlumber';
import Electrician from './components/screens/Electrician';
import UserElectrician from './components/screens/UserElectrician';
import Pestcontrol from './components/screens/Pestcontrol';
import UserPestcontrol from './components/screens/UserPestcontrol';
import Booking from './components/screens/Booking';
import Payment from './components/screens/Payment';

export const UserContext = createContext()



const Routing = () => {

  const history = useHistory()
  // const { state, dispatch } = useContext(UserContext)
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"))
  //   if (user) {
  //     dispatch({ type: "USER", payload: user })
  //   } else {
  //     if (!history.location.pathname.startsWith('/reset'))
  //       history.push('/login')
  //   }
  // }, [])
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/admin">
        <Admin />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/userHome">
        <UserHome />
      </Route>
      <Route exact path="/proHome">
        <ProHome />
      </Route>
      <Route exact path="/signuppro">
        <Signuppro />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/loginpro">
        <LoginPro />
      </Route>
      <Route exact path="/adminLogin">
        <AdminLogin />
      </Route>
      <Route exact path="/service">
        <Service />
      </Route>
      <Route exact path="/carpenter">
        <Carpenter />
      </Route>
      <Route exact path="/usercarpenter">
        <UserCarpenter />
      </Route>
      <Route exact path="/plumber">
        <Plumber />
      </Route>
      <Route exact path="/userplumber">
        <UserPlumber />
      </Route>
      <Route exact path="/electrician">
        <Electrician />
      </Route>
      <Route exact path="/userelectrician">
        <UserElectrician />
      </Route>
      <Route exact path="/pestcontrol">
        <Pestcontrol />
      </Route>
      <Route exact path="/userpestcontrol">
        <UserPestcontrol />
      </Route>
      <Route exact path="/userService">
        <UserService />
      </Route>
      <Route path="/profilepro">
        <ProfilePro />
      </Route>
      <Route path="/payment">
        <Payment />
      </Route>
      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
      <Route exact path="/booking">
        <Booking />
      </Route>
    </Switch>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
