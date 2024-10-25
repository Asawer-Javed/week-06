import { createStore } from 'redux';

// Initial state
const initialState = {
  users: [],
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

// Create store
const store = createStore(userReducer);

export default store;