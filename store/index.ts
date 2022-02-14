import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userAccountReducer from './reducers/userAccountReducer';
import contractReducer from './reducers/contractReducer';
import appStateReducer from './reducers/appStateReducer';

const rootReducer = combineReducers({
  userAccountReducer,
  contractReducer,
  appStateReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
