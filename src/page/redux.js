import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";
import { Provider, connect } from 'react-redux'

// React component
class Counter extends Component {
  constructor(props){
    super(props);
    this.topae=this.topae.bind(this);
  }
  topae(){
    this.props.history.push({pathname:'/subpage'})
  }
  render() {
    const { value, publicnum,onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
        <button onClick={this.topae}>跳转到别的页面去了</button>
        
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'increase' }

// Reducer


// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count,
    publicnum:state.publicnum
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
export default withRouter(App);