import React, { ChangeEvent, SelectHTMLAttributes } from 'react';
import Todos from '../Modals/Todos';

interface ISelectListProps {
    todoList: Todos[];
    setCurrentList: (e: ChangeEvent<HTMLSelectElement>) => void;
    value: string | undefined
}

export const SelectList = ({todoList, setCurrentList, value}: ISelectListProps) => {
    return (
        <select value={value} onChange={setCurrentList} name="" id="">
            <option value="">Current List</option>
            {
                todoList.map(tl => {
                    return <option value={tl.name}>{tl.name}</option>
                })
            }
        </select>
    )
}
