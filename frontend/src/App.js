import React, {useState, useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Navigation from './components/Navigation';
import Home from './components/Home'
import List from './components/List';
import FAQ from './components/FAQ';
import Register from './components/Register';
import Login from './components/Login';
import Participate from './components/Participate';
import Account from './components/Account';
import { AuthContext } from './context/auth';

import './App.css';

const App = () => {
  const [authTokens,setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens : setTokens}}>
      <Navigation/>
      <Switch>
        <Route  exact path='/' component={Home} />
        <Route  exact path='/faq' component={FAQ}/>
        <Route  exact path='/register' component={Register}/>
        <Route  exact path='/login' component={Login}/>
        <PrivateRoute  exact path='/list' component={List} />
        <PrivateRoute  exact path='/participate' component={Participate} user={authTokens}/>
        <PrivateRoute  exact path='/Account' component={Account}/>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;