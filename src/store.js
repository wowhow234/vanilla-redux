import { createAction, createReducer } from "@reduxjs/toolkit";
import { legacy_createStore } from "redux";

const addTodo = createAction("ADD", (text) => {
  return {
    payload: {
      text,
      id: Date.now(),
    },
  };
});

const deleteTodo = createAction("DELETE", (id) => {
  return {
    payload: {
      id,
    },
  };
});

// const reducer = (state = JSON.parse(localStorage.getItem("todo")), action) => {
//   switch (action.type) {
//     case addTodo.type:
//       // console.log("addTodo시 action---", action);
//       const setItem = { text: action.payload.text, id: action.payload.id };
//       localStorage.setItem("todo", JSON.stringify([setItem, ...state]));
//       return JSON.parse(localStorage.getItem("todo"));

//     case deleteTodo.type:
//       const deleteItem = state.filter((toDo) => toDo.id !== action.payload.id);
//       localStorage.setItem("todo", JSON.stringify(deleteItem));
//       return JSON.parse(localStorage.getItem("todo"));
//     default:
//       return state;
//   }
// };

const reducer = createReducer([], (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      const setItem = state.push({
        text: action.payload.text,
        id: action.payload.id,
      });
      localStorage.setItem("todo", JSON.stringify([setItem, ...state]));
      // console.log("acton text----", action);
      // console.log("state---------", state);
      console.log("로컬스토리지..", localStorage.getItem("todo"));
      // JSON.parse(localStorage.getItem("todo"));
      console.log("로컬스토리지..", JSON.parse(localStorage.getItem("todo")));
      // 이렇게 까지 했는데 왜 로컬스토리지에 0 부터 입력이 되지..?
    })
    .addCase(deleteTodo, (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload.id)
    );
});

const store = legacy_createStore(reducer);

export const actionCreators = {
  addTodo,
  deleteTodo,
};

export default store;
