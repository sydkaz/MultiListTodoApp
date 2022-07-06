import React from 'react';
import Todo from '../Modals/Todo';

interface IitemProps {
    item: Todo
}

export const TodoItem = ({item}: IitemProps) => {
    return (
        <div className="todo-item-container">
            <p>{item.text}</p>
        </div>
    )
}
