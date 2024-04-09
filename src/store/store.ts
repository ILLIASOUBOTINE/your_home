import {configureStore} from '@reduxjs/toolkit';
import userReduscer from './userReducer';
import taskReducer from './taskReducer';
import messageReducer from './messageReducer';

export const store = configureStore({
  reducer: {
    user: userReduscer,
    task: taskReducer,
    message: messageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
