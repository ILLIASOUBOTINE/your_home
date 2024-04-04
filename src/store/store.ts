import {configureStore} from '@reduxjs/toolkit';
import userReduscer from './userReducer';
import taskReducer from './taskReducer';

export const store = configureStore({
  reducer: {
    user: userReduscer,
    task: taskReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
