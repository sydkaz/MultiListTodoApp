
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import { MockLocalStorage } from "../test_helper/MockLocalStorage";
describe('Login', () => {

  it('Login button should be disabled if email and password fields are empty', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('email'), { target: { value: '' } });
    fireEvent.change(getByTestId('password'), { target: { value: '' } });
    expect(getByTestId(`login-button`)).toBeDisabled();
    
  });

  it('Login button should be disabled if email or password fields are empty', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('email'), { target: { value: '' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'abc123' } });
    expect(getByTestId(`login-button`)).toBeDisabled();

  });


  it('Login button should be enabled if email and password fields are not empty', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('email'), { target: { value: 'john@doe.com' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'johnabc' } });
    expect(getByTestId(`login-button`)).toBeEnabled();

  });

  it('User should be able to login successfully', () => {

    MockLocalStorage();

    const { getByTestId, getByText } = render(<App />);
    fireEvent.change(getByTestId('email'), { target: { value: 'kane@wood.com' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'kane123' } });
    fireEvent.click(getByTestId(`login-button`));
    expect(getByText('Logout')).toBeInTheDocument();

  });

})
