import React, { Component } from 'react';

class UserSignIn extends Component {
    handle_cancel = e => {
        e.preventDefault();
        this.props.history.push("/courses");
    }
    handle_submit = e => {
        e.preventDefault();
        this.props.sign_in(this.query.emailAddress.value, this.query.password.value);
        this.props.history.push("/courses");
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={this.handle_submit}>
                            <div><input id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        placeholder="Email Address"
                                        required ref={input => this.query = {emailAddress: input}}
                            /></div>
                            <div><input id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        required ref={input => this.query = {...this.query, password: input}}
                            /></div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary" onClick={this.handle_cancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
                </div>
            </div>
        );
    }
}

export default UserSignIn;