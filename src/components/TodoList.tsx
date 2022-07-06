import React, { useState, useEffect, useContext } from 'react'
import Todo from '../Modals/Todo'
import Todos from '../Modals/Todos'
import { TodoItem } from './TodoItem';
import { TodoContext, TodoContextType } from '../context/TodoContext';


export const TodoList = () => {

    const {state, dispatch} = useContext<TodoContextType>(TodoContext);

    const renderTodos = () => {
        return (
            <>
                {state?.user?.selectedList?.list.map((i: Todo) => {
                    return <TodoItem key={i.id} item={i} />
                })}
            </>
        )
    }

    return (
        <div data-testid="todo-list" className="list-container">
            <div className="list-header">
                <h1>{state?.user?.selectedList?.list ? `You have following items ` : `You have 0 items`} in {state?.user?.selectedList?.initialUpperCase && state?.user?.selectedList?.initialUpperCase()}</h1>
            </div>
            {
                renderTodos()
            }
        </div>
    )
}
