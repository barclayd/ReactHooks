import React, { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const todo = props => {
    // const [todoName, setTodoName] = useState('');
    const todoInputRef = useRef();
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

    const mouseMoveHandler = (event) => {
        console.log(event.clientX, event.clientY);

    };
    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, []);

    // const inputChangeHandler = (event) => {
    //     setTodoName(event.target.value);
    // };

    const todoAddHandler = () => {

        const todoName = todoInputRef.current.value;

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
        // setTodoName('');
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
                ref={todoInputRef}/>
            <button type='button' onClick={todoAddHandler}>Add</button>
            <ul>
                {todoList.map(todo => (
                    <li onClick={todoRemoveHandler.bind(this, todo.id)} key={todo.id}>{todo.name}</li>
                ))}
            </ul>
        </React.Fragment>
    );

};

export default todo;
