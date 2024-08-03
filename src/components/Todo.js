import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import { Link } from "react-router-dom";

const Todo = ({ text, onBtnClick, id }) => {
  return (
    <li>
      <Link to={`/${id}`}>
        {text} <button onClick={onBtnClick}>삭제</button>
      </Link>
    </li>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBtnClick: () => dispatch(actionCreators.deleteTodo(ownProps.id)),
  };
};

export default connect(null, mapDispatchToProps)(Todo);
