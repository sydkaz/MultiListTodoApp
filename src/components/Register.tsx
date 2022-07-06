import React, { useState, ChangeEvent, useContext } from 'react'
import { User, addUserToDB } from '../Modals/User';
import { TodoContext, TodoContextType } from '../context/TodoContext';
import { Types } from '../reducers/TodoReducer';


type RegisterPropTyps = {
    changeForm: (form: string) => void
}

export type FieldType = {
    type: string;
    property: string;
    placeholder: string;
}

type FormType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const Register = ({ changeForm }: RegisterPropTyps) => {


    const [registerForm, setRegisterForm] = useState<FormType>({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const { state, dispatch } = useContext<TodoContextType>(TodoContext)

    const fields: FieldType[] = [
        {
            type: 'text',
            property: 'firstName',
            placeholder: 'First Name'
        },
        {
            type: 'text',
            property: 'lastName',
            placeholder: 'Last Name'
        },
        {
            type: 'email',
            property: 'email',
            placeholder: 'Email'
        },

        {
            type: 'password',
            property: 'password',
            placeholder: 'Password'
        },

    ];

    const handleChange = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
        setRegisterForm((previousValues: FormType) => {
            return {
                ...previousValues,
                [id]: value
            }
        })
    }

    const createUser = () => {
        const { firstName, lastName, email, password } = registerForm;
        let user = new User(firstName, lastName, email, password);
        if (dispatch) {
            dispatch({ type: Types.SetCurrentUser, payload: addUserToDB(user) });
        }
    }

    return (
        <div className="form-fields-container">
            <h3>Register Now</h3>
            {
                fields.map((f: FieldType) => (
                    <input
                        key={f.property}
                        id={f.property}
                        type={f.type}
                        placeholder={f.placeholder}
                        onChange={handleChange} />
                ))
            }
            <button onClick={createUser}>Register</button>
            <p id="register-login" onClick={() => changeForm('login')}>Or Login</p>
        </div>
    )
}
