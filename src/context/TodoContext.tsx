import React, { createContext, useReducer, Dispatch } from 'react'
import { reducer, StateType } from '../reducers/TodoReducer';
import { User } from '../Modals/User';

export type TodoContextType = {
    state?: StateType,
    dispatch?: Dispatch<any>
}

export const TodoContext = createContext<TodoContextType>({});



export const TodoContextProvider = (props: any) => {

    const initialSate: StateType = {
        user: null,
        currentForm: 'login',
    }

    const [state, dispatch] = useReducer(reducer, initialSate);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {props.children}
        </TodoContext.Provider>

    )
}
