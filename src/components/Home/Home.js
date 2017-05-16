import React, { Component } from 'react';
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
    this.renderLogin = this.renderLogin.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.authHandler = this.authHandler.bind(this)
    this.state={
      items: {},
      uid: null,
      owner: null
    }
  }

  authenticate(provider){
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  authHandler(err, authData){
  console.log(authData)
  if(err){
    console.log(err)
    return
  }
  //Get the store info ref helps us to get a specific part of the database
  const storeRef = base.database().ref(this.props.storeId)

  console.log(this.props.storeId)

//it will get the data once, snapshot is from firebase
  storeRef.once('value', (snapshot)=>{
    const data = snapshot.val() || {}

    if(!data.owner){
      storeRef.set({
        owner:authData.user.uid
      })
    }
    this.setState({
      uid: authData.user.uid,
      owner: data.owner || authData.user.uid
    })
  })
}


  renderLogin(){
    return(
      <nav className="login">
        <h2>Log In</h2>
        <p>Sign in to manage your stores Inventory</p>
        <button className="facebook" onClick={()=> this.authenticate('facebook')}>Login wiht Facebook</button>
      </nav>
    )
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
    //this is for checking if user loged in
  if(!this.state.uid){
    return(
      <div>{this.renderLogin()}</div>
    )
  }
  //this is for checking if user is the owner
  if(this.state.uid !== this.state.owner){
    return(
      <div>
        <p>Sorry you are not the owner of this store</p>
      </div>
    )
  }
    return (
      <div className="App">
        <AddItem addToDo={this.addToDo}/>
        <TodoList items={this.state.items} removeItem={this.removeItem}/>
      </div>
    )
  }
}

export default Home;
