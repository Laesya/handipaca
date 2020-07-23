import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistor from './store/persistor';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home'
import List from './components/List';
import FAQ from './components/FAQ';
import Register from './components/Register';
import Login from './components/Login';
import Participate from './components/Participate';
import Account from './components/Account';
import Favorites from './components/Favorites';
import Badges from './components/Badges';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation/>
        <Switch>
          <Route  exact path='/' component={Home} />
          <Route  exact path='/faq' component={FAQ}/>
          <Route  exact path='/register' component={Register}/>
          <Route  exact path='/login' component={Login}/>
          <Route  exact path='/list' component={List} />
          <Route  exact path='/participate' component={Participate}/>
          <Route  exact path='/account' component={Account}/>
          <Route  exact path='/favorites' component={Favorites}/>
          <Route  exact path='/badges' component={Badges}/>
        </Switch>
      </PersistGate>
    </Provider>
  );
}

export default App;