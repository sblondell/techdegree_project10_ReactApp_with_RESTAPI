import React from 'react'
import {Route, Redirect, Link} from 'react-router-dom';



const withPrivateRoute = WrappedComponent => {
    class WithPrivateRoute extends React.Component {
        constructor(props) {
            super(props);
        
            this.state = {
                 
            }
        }

        get_out = () => {
            this.props.props.history.push("/signin");
        }
        
        render() {
            const {userState} = this.props.props;
            console.log(userState);

            return <Route render={() => {
                    if (userState.loggedIn) {
                        return <WrappedComponent {...this.props} />;
                    } else {
                        return <Redirect from="/courses" to="/signin" />;
                    }
                }}/>;
        }
    }
    return WithPrivateRoute;
}

export default withPrivateRoute;