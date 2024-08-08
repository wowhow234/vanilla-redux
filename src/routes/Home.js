import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Todo from "../components/Todo";

const Home = ({ toDos, dAddToDo }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    // console.log("submit 후 toDos?? ---->", toDos);
    e.preventDefault();
    dAddToDo(text);
    setText("");
  };

  return (
    <div>
      <h1>To Do 홈</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>추가하기</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <Todo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("현재 state....", state);
  return {
    toDos: state,
  };
};

function mapDispatchToProps(dispatch) {
  return { dAddToDo: (text) => dispatch(actionCreators.addTodo(text)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
