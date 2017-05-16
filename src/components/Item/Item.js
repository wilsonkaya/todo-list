import React from 'react'
import './item.css';

class Item extends React.Component{
  render(){
    const {details, index} = this.props
    return(
      <div className="item">
      <h2>{details.name}</h2>
      <h2>{details.time}</h2>
      <button onClick={() => this.props.removeItem(index)}>delete</button>
      </div>
    )
  }
}

export default Item
