import './App.css';
import React from 'react';
import {
  Navbar,
  Nav,

} from 'react-bootstrap'
import logo from './assets/logo.svg'


function App() {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Cryptocurrency Viewer
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar>
    </React.Fragment>
  );
}

export default App;


