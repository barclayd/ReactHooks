import React, { useState } from 'react';

const todo = props => {
   const [todoName, setTodoName] = useState('');
   const [todoList, setTodoList] = useState([]);

   const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    };

   const todoAddHandler = () => {
       setTodoList(todoList.concat(todoName));
       setTodoName('');
   };

    return (
    <React.Fragment>
        <input
            type='text'
            placeholder='Todo'
            value={todoName}
            onChange={inputChangeHandler}/>
        <button type='button' onClick={todoAddHandler}>Add</button>
        <ul>
            {todoList.map((todo, index) => (
                <li key={index}>{todo}</li>
                ))}
        </ul>
    </React.Fragment>
    );

};

export default todo;
