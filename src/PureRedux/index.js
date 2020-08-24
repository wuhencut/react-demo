import React from "react"
import { createStore, bindActionCreators, combineReducers } from "redux"
function run(){
  const initialState = {count: 0};

  // reducer
  const counter = (state = initialState, action) => {
    switch(action.type){
      case "PLUS_ONE": return {count: state.count + 1};
      case "MINUS_ONE": return {count: state.count - 1};
      case "CUSTOM_COUNT": return {count: state.count + action.payload.count};
      default: break;
    }
    return state
  }

  const todos = (state = {}) => state;

  // Create store
  const store = createStore(combineReducers({
    todos,
    counter
  }));
  // ActionCreator
  function plusone(){
    return {type: "PLUS_ONE"};
  }
  function minusone(){
    return {type: "MINUS_ONE"};
  }
  function customCount(count){
    return {type: "CUSTOM_COUNT", payload: {count}};
  }
  // 等于 store.dispatch(plusone());
  const plusOne = bindActionCreators(plusone, store.dispatch)

  store.subscribe(() => {console.log(store.getState())});
  // store.dispatch(plusone());
  plusOne()
  store.dispatch(minusone());
  store.dispatch(customCount(5));
  // 其实是一样的~
  // store.dispatch({type: "PLUS_ONE"});
  // store.dispatch({type: "MINUS_ONE"});
  // store.dispatch({type: "CUSTOM_COUNT", payload: {count: 5}});
}

export default () => (
  <div>
    <button onClick={run}>Run</button>
    <p>打开控制台console查看</p>
  </div>
)
