import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  inspiration_userInfo: localStorage.getItem('inspiration_userInfo')
    ? JSON.parse(localStorage.getItem('inspiration_userInfo'))
    : null,
};
function reducer(state, action) {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, inspiration_userInfo: action.payload };
    case 'USER_SIGNOUT':
      return { ...state, inspiration_userInfo: null };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
