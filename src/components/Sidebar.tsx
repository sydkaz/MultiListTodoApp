import React, { useContext, useState } from 'react'
import { AddNew } from './AddNew'
import Todos from '../Modals/Todos'
import { TodoContext, TodoContextType } from '../context/TodoContext'
import { Types } from '../reducers/TodoReducer'
import { Login } from './Login'
import { Register } from './Register'
import { User } from '../Modals/User'

export const Sidebar = () => {

    const { state, dispatch } = useContext<TodoContextType>(TodoContext);

    let user: User | null = null;
    let selectedList: Todos | null | any = null;
    let todoLists: Todos[] | null | any = null;

    if (state && state.user) {
        user = state.user;
        selectedList = user?.selectedList;
        todoLists = user?.todoLists;
    }
    const isSelected = (list: Todos) => {
        if (!list) {
            return;
        }
        if (list.name === selectedList?.name) {
            return {
                color: 'white',
                background: 'rgba(57, 114, 224, 1)'
            }
        }
        return {
            color: 'rgba(57, 114, 224, 1)',
            background: 'white'
        }
    }

    const addNewTodoList = (name: string) => {
        if (dispatch) {
            dispatch({ type: Types.CreateTodoList, payload: { name } });
            dispatch({ type: Types.SelectList, payload: { name } });
        }
    }

    const renderAddNewTodoList = () => {
        return (
            <AddNew
                addNewItem={addNewTodoList} placeHolder="Create New Todo List..." testId={'add-new-input'} />
        )
    }

    const renderTodoLists = () => {
        return (
            <div className="list-container" data-testid="sidebar-list">
                {
                    todoLists?.map((list: Todos, i: number) => {
                        return (
                            <div
                                key={list?.name + i}
                                style={isSelected(list)}
                                className="list-item"
                                data-testid={`sidebar-list-item ${i}`}
                                onClick={() => {
                                    if (dispatch) {
                                        dispatch({ type: Types.SelectList, payload: { name: list?.name } });
                                    }
                                }}>
                                <p style={isSelected(list)}>{list?.initialUpperCase && list?.initialUpperCase()} {list?.list?.length ? `(${list?.list?.length})` : ''}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }


    const changeForm = (form: string) => {
        if (dispatch) {
            dispatch({ type: Types.SetForm, payload: form });
        }
    }

    const renderLoginOrRegister = () => {
        return state?.currentForm === 'login' ? <Login changeForm={changeForm} /> : <Register changeForm={changeForm} />
    }

    return (
        <div className="sidebar">
            <h1><strong>Todo App</strong></h1>
            {
                user ?
                    <>
                        {renderAddNewTodoList()}
                        {todoLists && renderTodoLists()}
                    </>
                    :
                    renderLoginOrRegister()
            }
        </div >
    )
}
