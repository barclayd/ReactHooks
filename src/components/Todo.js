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
            });
        return () => {
          console.log('clean up');
        };
        // no array - every render cycle - infinite loop
        // only calls useEffect again if todoName changes
        // use empty array [] to have same lifecycle hook effect as componentDidMount
        // use todoName to simulate componentDidMount with componentDidUpdate + componentDidMount
    }, [todoName]);

    const mouseMoveHandler = (event) => {
        console.log(event.clientX, event.clientY);

    };

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, []);

    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));
        axios.post('https://react-hooks-e0025.firebaseio.com/todos.json', {id: Math.random(), name: todoName})
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
