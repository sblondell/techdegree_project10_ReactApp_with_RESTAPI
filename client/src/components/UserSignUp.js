import React, { Component } from 'react';

class UserSignUp extends Component {

    handle_cancel = e => {
        e.preventDefault();
		this.props.history.push("/courses");
    }

    handle_submit = e => {
        e.preventDefault();
        const newUser = {
            "firstName": "Chris",
            "lastName": "Blondell",
            "emailAddress": "Diddy@gma.net",
            "password": "hold",
        }

        const myHeader = new Headers({
            "Content-Type": "application/json"
        });

        const myRequest = new Request("http://localhost:5000/api/users", {
            method: "POST",
            headers: myHeader,
            body: JSON.stringify(newUser)
        });

        console.log(myRequest);

        fetch(myRequest)
            .then(res => {
                if (res.status === 200) {
                    this.props.sign_in(newUser.emailAddress, newUser.password);
		            this.props.history.push("/courses");
                }
            });
		// this.props.history.push("/courses");
    }

    input_JSX_Element = (name, type) => {
        // Inserting a " "(space) character inbetween the 'name' value
        // "firstName" ==> "first Name"
        let placeholder = name;
        for (let char of name) {
            if (/[A-Z]/.test(char)){
                let index = name.indexOf(char);
                placeholder = name.substring(0, index) + " " + name.substring(index);
            }
        }
        placeholder = placeholder[0].toUpperCase() + placeholder.substring(1);

        return <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    />
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form action="/courses" onSubmit={this.handle_submit}>
                            <div>{this.input_JSX_Element("firstName", "text")}</div>
                            <div>{this.input_JSX_Element("lastName", "text")}</div>
                            <div>{this.input_JSX_Element("emailAddress", "text")}</div>
                            <div>{this.input_JSX_Element("password", "password")}</div>
                            <div>{this.input_JSX_Element("confirmPassword", "password")}</div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary" onClick={this.handle_cancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
                </div>
            </div>
        );
    }
}

export default UserSignUp;