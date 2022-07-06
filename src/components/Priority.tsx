import React from 'react';
import IPriority from '../interfaces/Priority';

export const Priority = ({color, name, checked} : IPriority) => {
    return (
        <div className="priority-box">
            <div className="priority-radio" style={{ border: `3px solid ${color}` }}>
                {checked && <div className="priority-radio-filled" style={{background: color}}></div>}
            </div>
            <div className="priority-text" style={{ color }}>{name}</div>
        </div>
    )
}
