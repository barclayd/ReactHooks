import React, {useContext} from 'react';
import AuthContext from '../auth-context';


const header = props => {
    const auth = useContext(AuthContext);
    return (
        auth.status === true ?
        <header>
            <button onClick={props.onLoadTodos}>List of Todos</button>
            | <button onClick={props.onLoadAuth}>Auth</button>
        </header> : null
    );
};

export default header;
