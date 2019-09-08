//redux connect component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  {
  requestAddItem,
  requestPageData,
} from '../modules/ui/action.js';
class ReduxActions extends Component {

  constructor(props){
    super(props)
  }
  textChanged = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  buttonClickedGetData = () => {
    this.props.requestPageData(this.state.textBoxData)
  }

  buttonClickedAddItem = () => {
    this.props.requestAddItem([this.state.textBoxAdd])
  }
  render() {
    return (
      <div style={{display:"flex", flexDirection:"column"}}>
        {/*JSON.stringify(this.props.requestAddItem("balnShow"))*/}
        {/*this.props.showDefaultText && "Hello Redux"*/}
        <div className="add-item" style={{marginTop: '20px'}}>
          <input type="text" name="textBoxAdd" onChange={this.textChanged} style={{width:'20vw', marginRight:"4px"}}/>
        <button onClick={this.buttonClickedAddItem} style={{width:'12vw', marginRight:"4px"}}>addItem</button><br/>
          {this.props.items && this.props.items.map((item, index) => {
              return <div key={index}>{index} : {item} </div>
            })}
        </div>
        <br/><br/>
        <div className="get-page-data">
          <div> https://httpbin.org/get</div>
          <input type="text" name="textBoxData" onChange={this.textChanged} style={{width:'20vw', marginRight:"4px"}}/>
          <button onClick={this.buttonClickedGetData} style={{width:'12vw', marginRight:"4px"}}>getPageData</button><br/>

          <br/><br/>
          <pre style={{'textAlign': "left"}}>
            {this.props.pageData && JSON.stringify(this.props.pageData, null, 2)}
          </pre>
        </div>
      </div>
    )
  }
}

//获取state时候要加上reducer 前缀
function mapStateToProps(appState, ownProps) {
//  console.log(JSON.stringify(ownProps));
  return {
    ui: appState.ui,
    items: appState.ui.items,
    pageData: appState.ui.pageData
  }
}

function mapDispachToProps(dispatch) {
  //dispatch(requestAddItem("balsddsn"))
  return {
    ...bindActionCreators({
     requestAddItem,
     requestPageData
    }, dispatch)
  }
}
//或者简写为
//const actionCreators = {requestAddItem}

 ReduxActions = connect(mapStateToProps, mapDispachToProps)(ReduxActions);
export default ReduxActions;
