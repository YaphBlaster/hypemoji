import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { changeValue } from "./ducks";

const ReduxTest = props => {
  const { value } = props;
  return (
    <div>
      <div>{value}</div>
      <button onClick={() => props.changeValueLocal(value + 1)}>
        Increment
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  value: state.reduxTest.value
});

const mapDispatchToProps = dispatch => ({
  changeValueLocal: newValue => dispatch(changeValue(newValue))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxTest);
