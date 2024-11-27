/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
    });

    // Sync updatedData with the current todo data when the todo prop changes
    useEffect(() => {
        setUpdatedData({
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
        });
    }, [todo]);

    const handleSave = () => {
        onUpdate(todo.id, updatedData);
        setIsEditing(false);
    };

    const toggleCompleted = () => {
        const newCompleted = !updatedData.completed;
        setUpdatedData((prev) => ({ ...prev, completed: newCompleted }));
        onUpdate(todo.id, { ...updatedData, completed: newCompleted });
    };

    return (
        <li className="todo-item">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={updatedData.title}
                        onChange={(e) =>
                            setUpdatedData({ ...updatedData, title: e.target.value })
                        }
                    />
                    <textarea
                        value={updatedData.description}
                        onChange={(e) =>
                            setUpdatedData({ ...updatedData, description: e.target.value })
                        }
                    ></textarea>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <span className={updatedData.completed ? 'completed-title' : ''}>
                        {updatedData.title}
                    </span>
                    <em>{updatedData.description || 'No description'}</em>
                    <input
                        type="checkbox"
                        checked={updatedData.completed}
                        onChange={toggleCompleted}
                    />
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                </>
            )}
        </li>
    );
};

export default TodoItem;
