import React from 'react'
import { TodoContextProvider, TodoContextType, TodoContext } from './context/TodoContext';
import { Sidebar } from './components/Sidebar';
import { AddNewNList } from './components/AddNewNList';
import './App.css';

const App = () => {

  return (
    <TodoContextProvider>
      <div className="app-container">
        <Sidebar />
        <AddNewNList />
      </div>
    </TodoContextProvider>
  )
}

export default App;