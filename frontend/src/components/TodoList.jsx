/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../api/todoApi';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await getTodos();
            setTodos(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch todos');
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newTodo.title.trim()) return;
        try {
            const response = await createTodo({
                title: newTodo.title,
                description: newTodo.description,
                completed: false,
            });
            setTodos([...todos, response.data]);
            setNewTodo({ title: '', description: '' });
        } catch (err) {
            setError('Failed to create todo');
        }
    };

    const handleUpdate = (id, updatedData) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo)));
        updateTodo(id, updatedData); // Call API to update in DB
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (err) {
            setError('Failed to delete todo');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <h2>Todo List</h2>
            <div>
                <input
                    type="text"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    placeholder="Title"
                />
                <textarea
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    placeholder="Description"
                ></textarea>
                <button onClick={handleCreate}>Add Todo</button>
            </div>
            <div className="todo-header">
                <span>Title</span>
                <span>Description</span>
                <span>Completed</span>
            </div>
            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo} // Passing the full todo object
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
