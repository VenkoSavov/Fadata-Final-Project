import { combineReducers } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
 