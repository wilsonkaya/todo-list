import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Home.css';
import TodoList from '../TodoList/TodoList'
import AddItem from '../AddItem/AddItem'


class App extends Component {
  render() {
    return (
      <div className="App">
        <AddItem />
        <TodoList />
      </div>
    );
  }
}

export default App;
