import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodos, fetchTodos, deleteTodos, updateTodos } from '../features/todoList/todoSlice';
import './TodoList.css'; 

const TodoList = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector(state => state.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    function handleAdd() {
        if (input.trim() !== "") {
            dispatch(addTodos({ title: input }))
                .then(() => dispatch(fetchTodos()));
            setInput("");
        }
    }

    function handleUpdate(id, oldTitle) {
        const updateTitle = prompt('Edit your title here', oldTitle);
        if (updateTitle !== "") {
            dispatch(updateTodos({ id, title: updateTitle }));
        }
    }

    return (
        <div className="todo-container">
            <h2>To-Do List</h2>
            <div className="todo-input">
                <input
                    type="text"
                    placeholder="Enter title"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
    <button className="add-btn" onClick={handleAdd}>Add</button>
    </div>

    <ul className="todo-list">
    {tasks.map((todo) => (
      <li className="todo-item" key={todo._id}>
        <span className="todo-title">{todo.title}</span>
        <div className="btn-group">
          <button className="btn-edit" onClick={() => handleUpdate(todo._id, todo.title)}>Edit</button>
          <button className="btn-delete" onClick={() => dispatch(deleteTodos({ id: todo._id }))}>Delete</button>
        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
