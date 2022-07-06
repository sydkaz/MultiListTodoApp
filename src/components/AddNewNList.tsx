import React, { useContext } from 'react'
import { TodoContextType, TodoContext } from '../context/TodoContext';
import { Types } from '../reducers/TodoReducer';
import { AddNew } from './AddNew';
import { TodoList } from './TodoList';
import { User } from '../Modals/User';
import Todos from '../Modals/Todos';


export const AddNewNList = () => {
    const { state, dispatch } = useContext<TodoContextType>(TodoContext);

    let user: User | null = null;
    let selectedList: Todos | null | undefined = null;

    if (state?.user) {
        user = state.user;
        selectedList = user?.selectedList;
    }


    const addNewTodo = (text: string) => {
        if (dispatch) {
            dispatch({ type: Types.AddTodo, payload: { text } });
        }
    }

    const logoutUser = () => {
        if(dispatch) {
            dispatch({type: Types.SetCurrentUser, payload: null});
        }
    }

    const noTasks = () => {
        return (
            <div className="no-tasks-todo">
                <h1 id="no-tasks">You have no tasks to do. <br /> Hurray!!!</h1>
                <p id="to-add-new">To add new Todos create a Todo List on the left first</p>
            </div>
        )
    }

    const renderHeader = () => {
        return (
            <div className="user-header">
                <h1>{user?.firstName.toLocaleUpperCase()} {user?.lastName.toLocaleUpperCase()}</h1>
                <button onClick={logoutUser}>Logout</button>
            </div>
        )
    }

    const renderAddNewNTodos = () => {
        return (
            <>
                {renderHeader()}
                {selectedList ?
                    <AddNew
                        testId={'add-new-todo'}
                        addNewItem={addNewTodo}
                        placeHolder={`Add todos in ${selectedList?.initialUpperCase()} ...`} /> : noTasks()
                }

                {
                    selectedList?.list?.length ? <TodoList /> : ''
                }
            </>
        )
    }

    const noUser = () => {
        return (
            <div className="no-users-text">
                <h1 id="no-user" > Welcome to Todo List App!</h1 >
                <p id="to-add-new">Login or Register now to keep your todos organized.</p>
            </div>
        )
    }

    return (
        <div className="content-container">
            {
                user ?
                    renderAddNewNTodos()
                    : noUser()
            }
        </div>
    )
}
