import React from "react"
import Item from '../Item/Item'

class TodoList extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div>
        {Object.keys(this.props.items).map(key => <Item key={key} index={key} details={this.props.items[key]} removeItem={this.props.removeItem} />)}
      </div>

    )
  }
}

export default TodoList
