import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import withPrivateRoute from '../HOC/withPrivateRoute.js';



class CreateCourse extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div><h1>sklflsdjf</h1></div>
        );
    }
}

export default withPrivateRoute(CreateCourse);