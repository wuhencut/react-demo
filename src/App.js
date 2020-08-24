import React from 'react';
import './App.css';

const cnStr = {
  submit: "提交",
  cancel: "取消",
  btn: "Change to English"
},
enStr = {
  submit: "submit",
  cancel: "cancel",
  btn: "切换至中文"
}
const LangContext = React.createContext(enStr);
class LangProvider extends React.Component{
  state = { lang: cnStr};
  changeLang = () => {
    const lang = this.state.lang === enStr ? cnStr : enStr;
    this.setState({
      lang
    })
    console.log(this.state)
  }
  render(){
    return (
      <LangContext.Provider value={this.state.lang}>
        <button className="btn" onClick={this.changeLang}>
          {this.state.lang.btn}
        </button>
        {/* 相当于是 vue的slot */}
        {this.props.children} 
      </LangContext.Provider>
    )
  }
}

class LangButton extends React.Component{
  render() {
    return (
      <LangContext.Consumer>
        {lang => (
          <div>
            <button className="btn">{lang.cancel}</button>
            <button className="btn">{lang.submit}</button>
          </div>
        )}
      </LangContext.Consumer>
    )
  }
}

export default () => (
  <div>
    <LangProvider>
      <div>
        <LangButton/>
      </div>
    </LangProvider>
  </div>
);
