import React, {useContext} from 'react';
import AuthContext from '../auth-context';

const auth = props => {
    const auth = useContext(AuthContext);
    return (
        auth.status === true ? <p> Welcome, guest! </p> :
        <button onClick={auth.login}>Login</button>
    );
};

export default auth;
