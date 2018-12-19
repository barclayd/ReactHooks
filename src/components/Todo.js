import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = props => {
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        axios.get('https://react-hooks-e0025.firebaseio.com/todos.json')
            .then(response => {
                console.log(response.data);
                const todoData = response.data;
                let todos = [];
                for (const key in todoData) {
                    todos.push({id: key, name: todoData[key].name});
                }
                setTodoList(todos);
            })
            .catch(err => {
                console.log(err);
            })
    });

    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));
        axios.post('https://react-hooks-e0025.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
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
                {todoList.map(todo => (
                    <li key={todo.id}>{todo.name}</li>
                ))}
            </ul>
        </React.Fragment>
    );

};

export default todo;
