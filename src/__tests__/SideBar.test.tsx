import React from "react";
import { render, fireEvent, waitForElement, waitForDomChange } from "@testing-library/react";
import { AddNew } from "../components/AddNew";
import App from "../App";
import { MockLocalStorage } from "../test_helper/MockLocalStorage";

describe('Sidebar', () => {

  beforeEach(() => {
    MockLocalStorage();
  });

  it('adds a new todo list', async () => {
    const { getByPlaceholderText, getByTestId } = render(<App />);
    fireEvent.change(getByTestId('email'), { target: { value: 'kane@wood.com' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'kane123' } });
    fireEvent.click(getByTestId('login-button'));
    fireEvent.keyDown(getByPlaceholderText('Create New Todo List...'), { keyCode: 13, target: { value: 'shopping' } });

    let todosList = getByTestId('sidebar-list');
    expect(todosList.children[0]).toHaveTextContent('Shopping');
  });

  it('changes the current list', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<App />);
    fireEvent.change(getByTestId('email'), { target: { value: 'kane@wood.com' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'kane123' } });
    fireEvent.click(getByTestId('login-button'));
    fireEvent.keyDown(getByPlaceholderText('Create New Todo List...'), { keyCode: 13, target: { value: 'shopping' } });

    fireEvent.click(getByTestId('sidebar-list-item 0'));

    expect(getByTestId('add-new-todo')).toHaveAttribute('placeholder', ('Add todos in Shopping ...'));

  });
})
