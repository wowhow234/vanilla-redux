import { legacy_createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addTodo = (text) => {
  return {
    type: ADD,
    text,
    id: Date.now(),
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const reducer = (state = JSON.parse(localStorage.getItem("todo")), action) => {
  switch (action.type) {
    case ADD:
      const setItem = { text: action.text, id: action.id };
      localStorage.setItem("todo", JSON.stringify([setItem, ...state]));
      return JSON.parse(localStorage.getItem("todo"));
    case DELETE:
      const deleteItem = state.filter((toDo) => toDo.id !== action.id);
      localStorage.setItem("todo", JSON.stringify(deleteItem));
      return JSON.parse(localStorage.getItem("todo"));
    default:
      return state;
  }
};

const store = legacy_createStore(reducer);

export const actionCreators = {
  addTodo,
  deleteTodo,
};

export default store;
