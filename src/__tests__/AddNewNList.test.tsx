import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
describe.skip('Todo List', () => {
  it('shows when no to do list created', () => {
    const { getByText } = render(<App />);
    expect(getByText(`To add new Todos create a Todo List on the left first`)).toBeInTheDocument();

  });

  it('creates a new todo in the selected list', async () => {
      const { getByPlaceholderText, getByTestId } = render(<App />);
      fireEvent.keyDown(getByPlaceholderText('Create New Todo List...'), { keyCode: 13, target: { value: 'shopping' } });
      
      let todosList = getByTestId('sidebar-list');
      fireEvent.click(todosList.children[0]);
      

      fireEvent.keyDown(getByTestId('add-new-todo'), { keyCode: 13, target: { value: 'buy milk' } });
      
      expect(getByTestId('todo-list').children[1]).toHaveTextContent('buy milk');
  });
})
