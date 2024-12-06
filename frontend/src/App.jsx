/* eslint-disable no-unused-vars */
import React from 'react';
import TodoList from './components/TodoList';

const App = () => {
    return (
        <div>
            <div className="headerz">
                <h1>Task Management Application</h1>
                <p>Your aid in keeping track of tasks</p>
            </div>
            <TodoList />
        </div>
    );
};

export default App;
