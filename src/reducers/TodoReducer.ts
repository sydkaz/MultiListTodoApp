// import Todos from "../Modals/Todos";

import Todo from "../Modals/Todo";
import Todos from "../Modals/Todos";
import { User, updateUsers } from "../Modals/User";


export type StateType = {
    user: User | null | any;
    // todoLists: Todos[];
    // selectedList: Todos | any;
    currentForm?: string | any;
    todo?: Todo | null;
     
}

export enum Types {
    SetCurrentUser = 'SET_CURRENT_USER',
    CreateTodoList = 'CREATE_TODO_LIST',
    SelectList = 'SELECT_LIST',
    AddTodo = 'ADD_TODO',
    SetForm = 'SET_FORM',
    ToggleTodo = 'TOGGLE_TODO',
    DeleteTodo = 'DELETE_TODO',
}

type TodosPayload = {
    name: string;
}

type TodoItemPayload = {
    text: string;
}

export type CurrentFormPayload = {
    form: string;
}

export type TodoActionPayload = {
    id: string;
}

export type CreateUserActionType = {
    readonly type: Types.SetCurrentUser,
    readonly payload: User
}

export type CreateTodoListActionType = {
    readonly type: Types.CreateTodoList,
    readonly payload: TodosPayload
}

export type SelectTodoListActionType = {
    readonly type: Types.SelectList,
    readonly payload: TodosPayload
}

export type AddTodoActionType = {
    readonly type: Types.AddTodo,
    readonly payload: TodoItemPayload
}

export type SetFormActionType = {
    readonly type: Types.SetForm,
    readonly payload: CurrentFormPayload
}

export type DeleteTodoActionType = {
    readonly type: Types.DeleteTodo,
    readonly payload: TodoActionPayload
}
export type ToogleTodoActionType = {
    readonly type: Types.ToggleTodo,
    readonly payload: TodoActionPayload
}

export const reducer = (state: StateType, action: SetFormActionType | CreateUserActionType | CreateTodoListActionType | SelectTodoListActionType | AddTodoActionType | DeleteTodoActionType | ToogleTodoActionType) => {
    let newState;
    switch (action.type) {
        case Types.SetForm:
            newState = {
                ...state,
                currentForm: action.payload,
            };
            return newState;

        case Types.SetCurrentUser:
            if (action.payload === null) {
                return {
                    ...state,
                    user: null,
                }
            }
            newState = {
                ...state,
                user: new User().fromJSON(action.payload),
            };
            updateUsers(newState.user);
            return newState;
        case Types.CreateTodoList:
            newState = {
                ...state,
                user: {
                    ...state.user,
                    todoLists: [new Todos(action.payload.name)].concat(state.user?.todoLists),
                }
            };
            updateUsers(newState.user);
            return newState;

        case Types.SelectList:

            newState = {
                ...state,
                user: {
                    ...state.user,
                    selectedList: state.user?.todoLists.find((tl: Todos) => tl.name === action.payload.name),
                }
            };
            updateUsers(newState.user);
            return newState;

        case Types.AddTodo:
            state.user?.selectedList?.add(action.payload.text);
            newState = {
                ...state
            }
            updateUsers(newState.user);
            return newState;
        case Types.DeleteTodo:
            state.user?.selectedList?.remove(action.payload);
            newState = {
                ...state
            };
            updateUsers(newState.user);
            return newState;
        case Types.ToggleTodo:
            state.user?.selectedList?.toggle(action.payload);
            newState = {
                ...state
            };
            updateUsers(newState.user);
            return newState;
        default:
            return { ...state };
    }
}