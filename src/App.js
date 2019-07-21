import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/Dashboard';
import NoPage from './components/NoPage';
import Create from './components/Create';
import Edit from './components/Edit';
import Detail from './components/Detail';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Navbar></Navbar>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/home" exact component={Dashboard}></Route>
            <Route path="/create" exact component={Create}></Route>
            <Route path="/edit/:id" exact component={Edit}></Route>
            <Route path="/detail/:id" exact component={Detail}></Route>
            <Route exact component={NoPage}></Route>
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
