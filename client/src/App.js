import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css'
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Home from './components/screens/Home'
import Signup from './components/screens/Signup'
import Signuppro from './components/screens/Signuppro'
import Login from './components/screens/Login'
import LoginPro from './components/screens/Loginpro'
import Service from './components/screens/Service'
import Reset from './components/screens/UserReset'
import UserHome from './components/screens/UserHome'

import NewPassword from './components/screens/ProNewpassword'
import ProfilePro from './components/screens/Profilepro'
import { reducer, initialState } from './reducers/userReducer'

import Admin from './components/screens/Admin';
import AdminLogin from './components/screens/AdminLogin';
import UserCarpenter from './components/screens/UserCarpenter';
import UserPlumber from './components/screens/UserPlumber';
import UserElectrician from './components/screens/UserElectrician';
import UserPestcontrol from './components/screens/UserPestcontrol';
import Booking from './components/screens/Booking';
import ProWork from './components/screens/Prowork';
import ProHistory from './components/screens/ProHistory';
import Contactus from './components/screens/Contactus';
import AdminContact from './components/screens/AdminContact';
import UserHistory from './components/screens/UserHistory';
import Feedback from './components/screens/Feedback';
import ProBookings from './components/screens/ProBookings';
import UserBookings from './components/screens/UserBookings';
import UserReset from './components/screens/UserReset';
import Newpassword from './components/screens/UserNewpassword';
import ProNewpassword from './components/screens/ProNewpassword';
import ProReset from './components/screens/ProReset';
import AdminTransaction from './components/screens/AdminTransaction';
import ProPayment from './components/screens/ProPayment';
import UserPayment from './components/screens/UserPayment';

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
      <Route exact path="/adminTransaction">
        <AdminTransaction />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/userHome">
        <UserHome />
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
      
      <Route exact path="/usercarpenter">
        <UserCarpenter />
      </Route>
      
      <Route exact path="/userplumber">
        <UserPlumber />
      </Route>
     
      <Route exact path="/userelectrician">
        <UserElectrician />
      </Route>
      
      <Route exact path="/userpestcontrol">
        <UserPestcontrol />
      </Route>
      <Route exact path="/userBookings">
        <UserBookings/>
      </Route>
      <Route exact path="/userHistory">
        <UserHistory/>
      </Route>
      <Route path="/profilepro">
        <ProfilePro />
      </Route>
      <Route path="/todo">
        <ProWork />
      </Route>
      <Route path="/appointments">
        <ProBookings />
      </Route>
      <Route path="/proworkHistory">
        <ProHistory />
      </Route>
      <Route path="/proTransaction">
        <ProPayment />
      </Route>
      <Route path="/userPayment">
        <UserPayment />
      </Route>
      
      <Route exact path="/user/reset">
        <UserReset />
      </Route>
      <Route path="/reset/:token">
        <Newpassword />
      </Route>
      <Route exact path="/userpro/reset">
        <ProReset />
      </Route>
      <Route path="/userpro/reset/:token">
        <ProNewpassword />
      </Route>
      <Route exact path="/booking">
        <Booking />
      </Route>
      <Route exact path="/contactus">
        <Contactus />
      </Route>
      <Route exact path="/adminContact">
        <AdminContact />
      </Route>
      <Route exact path="/userFeedback">
        <Feedback/>
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
