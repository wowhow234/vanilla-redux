import { legacy_createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

export const addTodo = (text) => {
  return {
    type: ADD,
    text,
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: action.id }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo !== action.id);
    default:
      return state;
  }
};

const store = legacy_createStore(reducer);

export default store;
