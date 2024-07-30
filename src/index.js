import { legacy_createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return { type: ADD_TODO, text, id: Date.now() };
};

const deleteTodo = (id) => {
  return { type: DELETE_TODO, id };
};

const reducer = (state = [], action) => {
  // console.log("액션 확인--->", action);
  switch (action.type) {
    case ADD_TODO:
      const newTodoObj = { text: action.text, id: action.id };
      return [newTodoObj, ...state];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = legacy_createStore(reducer);

store.subscribe(() => console.log("스토어 확인..", store.getState()));

//action
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteTodo = (e) => {
  console.log(e.target.parentNode.id); // id를 이용해서 지울 것임.
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

// todo를 화면에 그리는 함수
const paintTodos = () => {
  const ToDos = store.getState();
  ul.innerHTML = "";
  ToDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "삭제";
    btn.addEventListener("click", dispatchDeleteTodo);

    li.id = toDo.id;
    li.innerText = toDo.text;
    ul.appendChild(li);
    li.appendChild(btn);
  });
};
store.subscribe(paintTodos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
