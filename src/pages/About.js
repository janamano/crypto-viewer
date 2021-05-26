import React from 'react';
import { 
    Jumbotron
} from 'react-bootstrap';
import logo from '../assets/logo.svg'
import './About.scss'

export default function About(props) {
    return (
        <Jumbotron className="jumbo">
            <div className="img">
                <img
                    alt=""
                    src={logo}
                    width="300"
                    height="300"
                    className="d-inline-block align-top"
                />
            </div>
            <div>
                <h2>This app was made for fun to keep track of cryptocurrency</h2>
                <p>This app was made for learning purposes using React Hooks and Bootstrap CSS</p>
            </div>
        </Jumbotron>
    )
}