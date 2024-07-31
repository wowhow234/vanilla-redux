import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

const Home = ({ toDos }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setText("");
    console.log("텍스트---", text);
  };
  return (
    <div>
      <h1>To Do 홈</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>추가하기</button>
      </form>
      <ul>{JSON.stringify(toDos)}</ul>
    </div>
  );
};

const getCurrentState = (state) => {
  return {
    toDos: state,
  };
};

export default connect(getCurrentState)(Home);
