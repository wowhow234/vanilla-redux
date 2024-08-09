import {
  configureStore,
  // createAction,
  // createReducer,
  createSlice,
} from "@reduxjs/toolkit";
// import { legacy_createStore } from "redux";

// ------------ actions
// const addTodo = createAction("ADD", (text) => {
//   return {
//     payload: {
//       text,
//       id: Date.now(),
//     },
//   };
// });

// const deleteTodo = createAction("DELETE", (id) => {
//   return {
//     payload: {
//       id,
//     },
//   };
// });

// ------------ reducer
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

// ------------ reducer with Redux-tookit
// const reducer = createReducer([], (builder) => {
//   builder
//     .addCase(addTodo, (state, action) => {
//       state.push({
//         text: action.payload.text,
//         id: action.payload.id,
//       });
//       localStorage.setItem("todo", JSON.stringify(state));
//       console.log("로컬스토리지..", localStorage.getItem("todo"));
//       JSON.parse(localStorage.getItem("todo")); // 이거 없어도 작동 되는데 why..?
//     })
//     .addCase(deleteTodo, (state, action) => {
//       const deleteItem = state.filter((toDo) => toDo.id !== action.payload.id);
//       localStorage.setItem("todo", JSON.stringify(deleteItem));
//       return JSON.parse(localStorage.getItem("todo"));
//     });
// });

// ------------ createSlice with Redux-toolkit
const toDos = createSlice({
  name: "toDos Reducer",
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push({
          text: action.payload.text,
          id: action.payload.id,
        });
        localStorage.setItem("todo", JSON.stringify(state));
        console.log("로컬스토리지..", localStorage.getItem("todo"));
        JSON.parse(localStorage.getItem("todo")); // 이거 없어도 작동 되는데 why..?
      },
      prepare: (text) => {
        return {
          payload: {
            text,
            id: Date.now(),
          },
        };
      },
    },
    removeTodo: (state, action) => {
      const deleteItem = state.filter((toDo) => toDo.id !== action.payload.id);
      localStorage.setItem("todo", JSON.stringify(deleteItem));
      return JSON.parse(localStorage.getItem("todo"));
    },
  },
});

// Redux store
// const store = configureStore({ reducer: toDos.reducer });

// console.log(toDos.actions);
// console.log(toDos.reducer);

export const { addTodo, removeTodo } = toDos.actions;

export default configureStore({ reducer: toDos.reducer });
