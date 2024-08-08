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
      state.push({
        text: action.payload.text,
        id: action.payload.id,
      });
      localStorage.setItem("todo", JSON.stringify(state));
      console.log("로컬스토리지..", localStorage.getItem("todo"));
      JSON.parse(localStorage.getItem("todo")); // 이거 없어도 작동 되는데 why..?
    })
    .addCase(deleteTodo, (state, action) => {
      const deleteItem = state.filter((toDo) => toDo.id !== action.payload.id);
      localStorage.setItem("todo", JSON.stringify(deleteItem));
      return JSON.parse(localStorage.getItem("todo"));
    });
});

const store = legacy_createStore(reducer);

export const actionCreators = {
  addTodo,
  deleteTodo,
};

export default store;
