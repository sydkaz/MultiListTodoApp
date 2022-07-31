import React, { useContext } from 'react';
import { TodoContext, TodoContextType } from '../context/TodoContext';
import Todo from '../Modals/Todo';
import { Types } from '../reducers/TodoReducer';

interface IitemProps {
    item: Todo
}

export const TodoItem = ({item}: IitemProps) => {
    const {state, dispatch} = useContext<TodoContextType>(TodoContext);
    
    return (
        <div className="todo-item-container">
            <p>{item.text}</p>
            <span className='button toggle' >
                <input type="checkbox" checked={item?.isComplete} onClick={()=>{if (dispatch) { dispatch({ type: Types.ToggleTodo, payload: item  });}}}/>
            </span>
            <span  className='button delete' onClick={()=>{if (dispatch) { dispatch({ type: Types.DeleteTodo, payload: item  });}}}>X</span>
        </div>
    )
}
