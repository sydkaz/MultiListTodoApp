import React from 'react';
import IPriority from '../interfaces/Priority';
import { Priority } from './Priority';

const priorities: IPriority[] = [
    {
        name: 'High',
        color: 'lightcoral',
        checked: false,
    },
    {
        name: 'Medium',
        color: 'lightseagreen',
        checked: true,
    },
    {
        name: 'Low',
        color: 'lightgreen',
        checked: false,
    },
];

export const TodoDetails = () => {
    return (
        <div className="todo-details">
            <div className="priority-details">
                {
                    priorities.map((p: IPriority) => {
                        return <Priority 
                            name={p.name}
                            color={p.color}
                            checked={p.checked}/>
                    })
                }
            </div>
            <div className="due-date-details">
                <input type="date" required />
            </div>
        </div>
    )
}
