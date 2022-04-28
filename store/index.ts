import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userAccountReducer from './reducers/userAccountReducer';
import eventReducer from './reducers/eventReducer';
import evidenceReducer from './reducers/evidenceReducer';
import appStateReducer from './reducers/appStateReducer';

const rootReducer = combineReducers({
  userAccountReducer,
  eventReducer,
  evidenceReducer,
  appStateReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
