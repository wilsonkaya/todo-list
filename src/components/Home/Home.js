import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Home.css';
import TodoList from '../TodoList/TodoList'
import AddItem from '../AddItem/AddItem'
import base from '../../base'

window.id = 0
class Home extends React.Component {

  constructor(props){
    super(props)
    this.addToDo = this.addToDo.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.state={
      items: {}
    }
  }

  componentWillMount(){
    this.ref = base.syncState("list",
    {
      context: this,
      state: 'items'
    })
  }

  componentWillUnmount(){
    base.removeBinding(this.ref)
  }

  addToDo(item){
     const items = {...this.state.items}
     const timeStamp = Date.now()
     items[`item-${timeStamp}`] = item
     this.setState({items})
  }

  removeItem(key){
    const items = {...this.state.items}
    items[key] = null
    this.setState({items})
  }

  render() {
    return (
      <div className="App">
        <AddItem addToDo={this.addToDo}/>
        <TodoList items={this.state.items} removeItem={this.removeItem}/>
      </div>
    )
  }
}

export default Home;
