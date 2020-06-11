import React from 'react';
import ReactDOM from 'react-dom';
import TextEditor from './TextEditor';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <nav>
            <div id="nav-left">
                <NavLink to="/">Draft.js Demo</NavLink>
            </div>
            <div id="nav-right">
                <NavLink to="/articles">Articles</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
        </nav>
        <main>
            <TextEditor />
        </main>
    </Router>,
    document.getElementById('app')
)
