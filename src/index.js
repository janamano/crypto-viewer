import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CustomProvider from './store/CustomProvider'
import Dashboard from './pages/Dashboard'
import About from './pages/About'


const app = (
  <CustomProvider>
    <App />
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  </CustomProvider>
) 


ReactDOM.render(app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
