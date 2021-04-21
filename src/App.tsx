import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import Main from './pages/Main';
import Nav from './components/Nav';
import Weather from './components/Weather';
import { RootState } from './store/index';
import FavoritePage from './pages/FavoritePage';
import LaunchPage from './components/LaunchPage';
import SidebarSignUp from './components/SidebarSignUp';

function App(): JSX.Element {
  const isSignup = useSelector((state: RootState) => state.signupReducer.isSignup);
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);

  return (
    <Router>
      <Nav isLogin={isLogin} />
      {isSignup ? (
        <SidebarSignUp />
      ) : (
        <Switch>
          <Route exact path='/' component={LaunchPage} />
          <Route exact path='/main/:date' component={Weather} />
          <Route exact path='/myFavorite' component={FavoritePage} />
        </Switch>
      )}
    </Router>
  );
}

export default App;
