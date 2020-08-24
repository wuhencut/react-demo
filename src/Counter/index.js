import React from "react"
import {createStore, bindActionCreators} from "redux"
import {Provider, connect} from "react-redux"

const initialState = {count: 0};
// reducer
const counter = (state = initialState, action) => {
  switch (action.type){
    case "PLUS_ONE": return {count: state.count + 1}
    case "MINUS_ONE": return {count: state.count + 1}
    case "CUSTOM_COUNT": return {count: state.count + action.payload.count}
    default: break
  }
  return state;
}

// create store
const store = createStore(counter);
// actione creator
function plusone(){
  return {type: "PLUS_ONE"}
}
function minusone(){
  return {type: "MINUS_ONE"}
}
// component
export class Counter extends React.Component {
  render() {
    const {count, plusone, minusone} = this.props;
    return (
      <div className="counter">
        <button onClick={minusone}>-</button>
        <span style={{display: "inline-block", margin: "10px"}}>
          {count}
        </span>
        <button onClick={plusone}>+</button>
      </div>
    )
  }
}
// 不可以直接把state全部赋值进来，这样会导致state一旦有变化，不管是不是count变化，都会重新渲染
function mapStateToProps(state){
  return {
    count: state.count
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({plusone, minusone}, dispatch)
}

const ConnectCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default class CounterSample extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <ConnectCounter></ConnectCounter>
      </Provider>
    )
  }
}