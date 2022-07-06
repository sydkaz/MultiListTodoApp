import React, { Dispatch, useState, ChangeEvent, useContext } from 'react'
import { FieldType } from './Register';
import { TodoContext, TodoContextType } from '../context/TodoContext';
import { Types } from '../reducers/TodoReducer';
import { authenticateUser } from '../Modals/User';

type LoginPropTyps = {
    changeForm: (form: string) => void 
}

type loginForm = {
    email: string;
    password: string;
}

export const Login = ({changeForm} : LoginPropTyps) => {

    const [loginForm, setLoginForm] = useState<loginForm>({email: '', password: ''});

    const {state, dispatch} = useContext<TodoContextType>(TodoContext);

    const fields : FieldType[] = [
        {
            type: 'email',
            placeholder: 'Email',
            property: 'email',
        },
        
        {
            type: 'password',
            placeholder: 'Password',
            property: 'password'
        },
        
    ];

    const handleChange = ({target: {value, id}}: ChangeEvent<HTMLInputElement>) => {
        setLoginForm((previousValues: loginForm) => {
            return {
                ...previousValues,
                [id]: value
            }
        });
    }

    const loginUser = () => {
        if(dispatch) {
            dispatch({type: Types.SetCurrentUser, payload: authenticateUser(loginForm)});
        }
    }

    const isDisabled = () => {
        return !loginForm.email || !loginForm.password;
        // return true;
    }

    return (
        <div className="form-fields-container">
            <h3>Login Now</h3>
            {
                fields.map(f => (
                    <input
                    key={f.property}
                    id={f.property}
                    data-testid={f.property}
                    type={f.type} 
                    placeholder={f.placeholder} 
                    onChange={handleChange}/>
                ))
            }
            <button data-testid="login-button" disabled={isDisabled()} onClick={loginUser}>Login</button>
            <p id="register-login" onClick={() => changeForm('register')}>Or Register</p>
        </div>
    )
}
