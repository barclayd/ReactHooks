import React, { useState } from 'react';

const todo = props => {
   // const [todoName, setTodoName] = useState('');
   // const [todoList, setTodoList] = useState([]);

    const [todoState, setTodoState] = useState({
        userInput: '',
        todoList: []
    });

   const inputChangeHandler = (event) => {
       setTodoState({
           userInput: event.target.value,
            todoList: todoState.todoList
       });
    };

   const todoAddHandler = () => {
       setTodoState({
           userInput: todoState.userInput,
            todoList: todoState.todoList.concat(todoState.userInput)
       });
   };

    return (
    <React.Fragment>
        <input
            type='text'
            placeholder='Todo'
            value={todoState.userInput}
            onChange={inputChangeHandler}/>
        <button type='button' onClick={todoAddHandler}>Add</button>
        <ul>
            {todoState.todoList.map((todo, index) => (
                <li key={index}>{todo}</li>
                ))}
        </ul>
    </React.Fragment>
    );

};

export default todo;
