import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { History } from 'history';

import { AppThunk } from '../../app/store';
import { getErrorMessage } from '../../service/service-utils';
import { IdType } from '../../shared/shared-types';
import { User } from '../../model/user.model';
import userService from '../../service/user-service';

interface UsersState {
  currentUserId: IdType | null;
  users: User[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

interface UsersLoaded {
  users: User[];
}

const initialState: UsersState = {
  currentUserId: null,
  users: [],
  loading: false,
  error: null,
  message:null
}

const users = createSlice({
  name: 'users',
  initialState, 
  reducers: {
    getUsersStart(state) {
      state.loading = true
      state.error = null
    },
    getUsersSuccess(state, action: PayloadAction<UsersLoaded>) {
      const { users } = action.payload;
      state.users = users;
      state.loading = false;
      state.error = null;
    }, 
     usersFailure(state, action: PayloadAction<string>) {
       state.loading = false;
       state.error = action.payload;
       state.message = null;
    },
    selectUserById(state, action: PayloadAction<IdType>) {
      state.currentUserId = action.payload;
    },
    getUserByIdStart(state, action: PayloadAction<IdType>) {
      state.currentUserId = action.payload;
      state.loading = true;
      state.error = null;
    },
    getUserByIdSuccess(state, action: PayloadAction<User>) {
      const user = action.payload;
      const index = state.users.findIndex(p => p._id === user._id);
      if (index < 0) {
        state.users.push(user)
      } else {
        state.users[index] = user;
      }
      state.loading = false;
      state.error = null;
    }, 
    createUserStart(state, action: PayloadAction<User>) {
      state.currentUserId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    createUserSuccess(state, action: PayloadAction<User>) {
      const user = action.payload;
      state.users.push(user)
      state.loading = false;
      state.error = null;
      state.message = `User "${action.payload.username}" created successfully.`;
     },
    updateUserStart(state, action: PayloadAction<User>) {
      state.currentUserId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action: PayloadAction<User>) {
      const user = action.payload;
      const index = state.users.findIndex(p => p._id === user._id);
      if (index < 0) {
        state.users.push(user)
      } else {
        state.users[index] = user;
      }
      state.loading = false;
      state.error = null;
      state.message = `User ${action.payload.username} updated successfully.`;
    },
    deleteUserByIdStart(state, action: PayloadAction<IdType>) {
      state.currentUserId = action.payload;
      state.loading = true;
      state.error = null;
    },
    deleteUserByIdSuccess(state, action: PayloadAction<User>) {
      const user = action.payload;
      const index = state.users.findIndex(p => p._id === user._id);
      if (index >= 0) {
        state.users.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
      state.message = `User ${action.payload.username} deleted successfully.`;
    },
  }
})

export const {
  getUsersStart,
  getUsersSuccess,
  usersFailure,
  selectUserById,
  getUserByIdStart,
  getUserByIdSuccess,
  createUserStart,
  createUserSuccess,
  updateUserStart,
  updateUserSuccess,
  deleteUserByIdStart,
  deleteUserByIdSuccess,
} = users.actions
export default users.reducer

export const fetchUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getUsersStart())
    const localUsers = localStorage.getItem('users');
    if (localUsers) {
      console.log(localUsers);
      dispatch(getUsersSuccess({ users: JSON.parse(localUsers) as User[] }));
    }
    const users = await userService.getAllUsers()
    dispatch(getUsersSuccess({ users }))
    localStorage.setItem('users', JSON.stringify(users));
  } catch (err) {
    dispatch(usersFailure(getErrorMessage(err)))
  }
} 

export const fetchUserById = (userId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(getUserByIdStart(userId));
    const user = await userService.getUserById(userId);
    dispatch(getUserByIdSuccess(user));
  } catch (err) {
    dispatch(usersFailure(getErrorMessage(err)))
  }
}

export const createUser = (
  user: User, 
  history: History<History.PoorMansUnknown>, 
  // setSubmitting: (isSubmitting: boolean) => void
  ): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(createUserStart(user));
    const authToken = getState().auth.token;
    const created = await userService.createNewUser(user, authToken);
    dispatch(createUserSuccess(created));
    history.push('/login');
  } catch (err) {
    dispatch(usersFailure(getErrorMessage(err)))
  } 
  // finally {
  //   setSubmitting(false);
  // }
}

export const updateUser = (
  user: User, 
  history: History<History.PoorMansUnknown>, 
  // setSubmitting: (isSubmitting: boolean) => void
  ): AppThunk => async (dispatch) => {
  try {
    dispatch(updateUserStart(user));
    const created = await userService.updateUser(user);
    dispatch(updateUserSuccess(created));
    history.push('/users');
  } catch (err) {
    dispatch(usersFailure(getErrorMessage(err)))
  } 
  // finally {
  //   setSubmitting(false);
  // }
}

export const deleteUser = (userId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(deleteUserByIdStart(userId));
    const deleted = await userService.deleteUser(userId);
    dispatch(deleteUserByIdSuccess(deleted));
  } catch (err) {
    dispatch(usersFailure(getErrorMessage(err)))
  }
}
