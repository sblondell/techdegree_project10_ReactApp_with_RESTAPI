import React from 'react';

const UserSignOut = props => {
    props.sign_out();
    props.history.push("/courses");
    return null;
}

export default UserSignOut;
