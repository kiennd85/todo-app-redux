// import { createStore } from 'redux';
// import rootReducer from './reducer';

// import { composeWithDevTools } from 'redux-devtools-extension';

// //Su dung dev tool extension
// const composeEnhancers = composeWithDevTools();

// const store = createStore(rootReducer, composeEnhancers);

// export default store;

import { configureStore } from '@reduxjs/toolkit';

import filtersSlice from '../components/Filters/filtersSlice';
import todoListSlice from '../components/TodoList/todoListSlice';

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoListSlice.reducer,
  },
});

export default store;
