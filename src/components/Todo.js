import React, { useEffect, useReducer, useRef, useMemo } from 'react';
import List from './List';
import axios from 'axios';
import {useFormInput} from '../hooks/forms';

const todo = props => {

    const todoInputRef = useRef();
    const todoInput = useFormInput();
    const todoListReducer = (state, action) => {
        switch(action.type){
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload);
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []);


    useEffect(() => {
        axios.get('https://react-hooks-e0025.firebaseio.com/todos.json')
            .then(response => {
                console.log(response.data);
                const todoData = response.data;
                let todos = [];
                for (const key in todoData) {
                    todos.push({id: key, name: todoData[key].name});
                }
                dispatch({
                    type: 'SET',
                    payload: todos
                });
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
    }, [todoInputRef]);


    const todoAddHandler = () => {

        const todoName = todoInput.value;

        axios.post('https://react-hooks-e0025.firebaseio.com/todos.json', {id: Math.random(), name: todoName})
            .then(res => {
                console.log(res);
                const todoItem = {id: res.data.name, name: todoName};
                dispatch({
                    type: 'ADD',
                    payload: todoItem});
            })
            .catch(err => {
                console.log(err);
            });
    };

    const todoRemoveHandler = todoId => {
        axios.delete(`https://react-hooks-e0025.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                console.log(res);
                dispatch({
                    type: 'REMOVE',
                    payload: todoId
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <React.Fragment>
            <input
                type='text'
                placeholder='Todo'
                onChange={todoInput.onChange}
                value={todoInput.value}
                style={{backgroundColor: todoInput.validity ? 'transparent' : 'red'}}
                />
            <button type='button' onClick={todoAddHandler}>Add</button>
            {useMemo(() => <List items={todoList} onClick={todoRemoveHandler}/>, [todoList])}
        </React.Fragment>
    );

};

export default todo;
