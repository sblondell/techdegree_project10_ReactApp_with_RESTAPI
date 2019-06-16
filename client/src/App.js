import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/Header.js';
import Courses from './components/Courses.js';
import UserSignIn from './components/UserSignIn.js';
import UserSignUp from './components/UserSignUp.js';
import UserSignOut from './components/UserSignOut.js';



class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            currentUser: {}
        };
    }

    sign_in = (userName, password) => {
        const _64encoded_userAndPass = window.btoa(`${userName}:${password}`);

        const myHeader = new Headers({
            withCredentials: true,
            Authorization: "Basic " + _64encoded_userAndPass
        });

        const myRequest = new Request("http://localhost:5000/api/users", {
            method: "GET",
            headers: myHeader
        });

        fetch(myRequest)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(res => this.setState(
                            {loggedIn: true,
                            currentUser: res}));
                } else {
                    return res;
                }
            });
    }

    sign_out = () => {
        this.setState({loggedIn: false, currentUser: {}});
    }

    render() {
        console.log("HIT");
        return (
            <div>
                <BrowserRouter>
                    <Header loggedIn={this.state.loggedIn} currentUser={this.state.currentUser} />
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/courses" />} />
                        <Route path="/courses" render={ routeProps => <Courses props={{userState: this.state, ...routeProps}} />} />
                        {/* <Route path="/courses" component={Courses} /> */}
                        <Route path="/signin" render={ routeProps => <UserSignIn history={routeProps.history} sign_in={this.sign_in}/>} />
                        <Route path="/signup" render={ routeProps => <UserSignUp history={routeProps.history} sign_in={this.sign_in}/>} />
                        <Route path="/signout" render={ routeProps => <UserSignOut history={routeProps.history} sign_out={this.sign_out}/>} />
                        {/* <Route render={() => <p>404</p>} /> */}
                    </Switch>
                </BrowserRouter>
            </div>
        );
  }
}

export default App;
