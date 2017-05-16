import React from 'react'
import './AddItem.css'

class AddItem extends React.Component {
  constructor(){
    super()
    // this.state = {
    //   item: null
    // }
  }
createItem(event){
  event.preventDefault()
  const item = {
    name: this.name.value,
    time: this.time.value
  }
  this.props.addToDo(item)
  this.itemForm.reset()
}

render(){
  return (
    <div className='inputForm'>
      <form ref={(input)=> {this.itemForm = input}} onSubmit={(e) => {this.createItem(e)}}>
        <input ref={(input) => this.name = input} type="text"/>
        <input ref={(input) => this.time = input} type="text"/>
        <button type="submit">
          +
        </button>
      </form>
    </div>
    )
  };
}


export default AddItem
