import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import './css/index.css';
import './css/float-grid.css';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
