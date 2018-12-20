import React from 'react';

const list = props => {
    console.log('Rendering the list...');
    return (
        <ul>
            {props.items.map(todo => (
                <li onClick={props.onClick.bind(this, todo.id)} key={todo.id}>{todo.name}</li>
            ))}
        </ul>
    )
};

export default list;

