import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from 'react-dom';
import App from './components/App';
import './App.css';

// <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'">


// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');

root.id = 'root';
document.body.appendChild(root);


// Now we can render our application into it
render(<App />, document.getElementById('root'));
