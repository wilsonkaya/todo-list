import React from 'react'

class Item extends React.Component{
  render(){
    const {details} = this.props
    return(
      <p>
      <h2>{details.name}</h2>
      <h2>{details.time}</h2>
      </p>
    )
  }
}

export default Item
