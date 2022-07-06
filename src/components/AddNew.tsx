import React, { ChangeEvent, KeyboardEvent, useContext } from 'react'

interface INewTodoProps {
    addNewItem: (value: string) => void;
    placeHolder: string
    testId: string
}

export const AddNew = ({ addNewItem, placeHolder, testId }: INewTodoProps) => {

    const handleChange = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.keyCode === 13) {
            addNewItem(e.currentTarget.value);
            e.currentTarget.value = '';
        }
    }

    return (
        <div>
            <input
                data-testid={testId}
                type="text"
                placeholder={placeHolder}
                onKeyDown={handleChange}
            />
        </div>
    )
}
