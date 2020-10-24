import React,{useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import Header from './Header/Header';
import Home from './Home/Home'
import Checkout from './Checkout/Checkout'
import Login from './Login/Login'
import Payment from './Payment/Payment'
import Orders from './Orders/Orders'
import {auth} from './firebase'
import { useStateValue } from './StateProvider';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51HZVU0Ay3KjE7XR6uV53S1zROidZOsPXs3xf4b6TztVI6CVbMDle49hRVOaXwu2FRQlnx2Her5oUZzwPMrWOGocb00dGwYjUAm');

function App() {
  const [{},dispatch]=useStateValue()
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log('The user is',authUser)
      if(authUser){
        //the user just logged in/the user was logged in
        dispatch({
          type:'SET_THE_USER',
          user:authUser
        })
      }else{
        //user is logged out
        dispatch({
          type:'SET_THE_USER',
          user:null
        })
      }
    })
  },[])
  return (
    <Router>
    <div>
    
      <Switch>
        <Route exact path='/'>
        <Header/>
        <Home/>
        </Route>
        <Route path='/checkout'>
        <Header/>
        <Checkout/>
        </Route>
        <Route path='/login' component={Login}/>
        <Route path='/payment'>
        <Header/>
        <Elements stripe={stripePromise}>
          <Payment/>
        </Elements>
        </Route>
        <Route path='/orders'>
          <Header/>
          <Orders/>
        </Route>
      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
