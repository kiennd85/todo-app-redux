// const initState = [
//   { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
//   { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
//   { id: 3, name: 'Learn JavaScript', completed: false, priority: 'Low' },
// ];

// const todoListReducer = (state = initState, action) => {
//   switch (action.type) {
//     case 'todoList/addTodo':
//       return [...state, action.payload];
//     case 'todoList/toggleTodoStatus':
//       return state.map((todo) =>
//         todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       );
//     default:
//       return state;
//   }
// };

// export default todoListReducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todoList',
  initialState: { status: 'idle', todos: [] }, // Doi tu [] sang {status: '', todos: []}
  // { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
  // { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
  // { id: 3, name: 'Learn JavaScript', completed: false, priority: 'Low' },

  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = 'idle';
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        console.log(state);
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        console.log(state.todos);
        let currentTodo = state.todos.find(
          (todo) => todo.id === action.payload
        );
        console.log({ currentTodo });
        currentTodo = action.payload;
      });
  },
});

// 1 createAsyncThunk tạo ra 3 action:
// - todos/fetchTodos/pending
// - todos/fetchTodos/fullfilled
// - todos/fetchTodos/rejected

//thunk function creator de lay du lieu tu server
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await fetch('/api/todos');
  const data = await res.json();
  //console.log({ data });
  return data.todos;
});

//thunk function creator de nhap du lieu tu user
export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (newTodo) => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    });
    const data = await res.json();
    //console.log({ data });
    return data.todos;
  }
);

//thunk function creator de update 1 item dang ton tai
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (updateTodo) => {
    const res = await fetch('api/updateTodo', {
      method: 'POST',
      body: JSON.stringify(updateTodo),
    });
    const data = await res.json();
    return data.todos;
  }
);

export default todosSlice;
