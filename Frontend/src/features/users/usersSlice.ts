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
  posts: User[];
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
    // getPostsStart(state) {
    //   state.loading = true
    //   state.error = null
    // },
    // getPostsSuccess(state, action: PayloadAction<PostsLoaded>) {
    //   const { posts } = action.payload;
    //   state.posts = posts;
    //   state.loading = false;
    //   state.error = null;
    // }, 
     usersFailure(state, action: PayloadAction<string>) {
       state.loading = false;
       state.error = action.payload;
       state.message = null;
    },
    // selectPostById(state, action: PayloadAction<IdType>) {
    //   state.currentPostId = action.payload;
    // },
    // getPostByIdStart(state, action: PayloadAction<IdType>) {
    //   state.currentPostId = action.payload;
    //   state.loading = true;
    //   state.error = null;
    // },
    // getPostByIdSuccess(state, action: PayloadAction<Post>) {
    //   const post = action.payload;
    //   const index = state.posts.findIndex(p => p._id === post._id);
    //   if (index < 0) {
    //     state.posts.push(post)
    //   } else {
    //     state.posts[index] = post;
    //   }
    //   state.loading = false;
    //   state.error = null;
    // },
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
    // updatePostStart(state, action: PayloadAction<Post>) {
    //   state.currentPostId = action.payload._id;
    //   state.loading = true;
    //   state.error = null;
    // },
    // updatePostSuccess(state, action: PayloadAction<Post>) {
    //   const post = action.payload;
    //   const index = state.posts.findIndex(p => p._id === post._id);
    //   if (index < 0) {
    //     state.posts.push(post)
    //   } else {
    //     state.posts[index] = post;
    //   }
    //   state.loading = false;
    //   state.error = null;
    //   state.message = `Post "${action.payload.author}" updated successfully.`;
    // },
    // deletePostByIdStart(state, action: PayloadAction<IdType>) {
    //   state.currentPostId = action.payload;
    //   state.loading = true;
    //   state.error = null;
    // },
    // deletePostByIdSuccess(state, action: PayloadAction<Post>) {
    //   const post = action.payload;
    //   const index = state.posts.findIndex(p => p._id === post._id);
    //   if (index >= 0) {
    //     state.posts.splice(index, 1);
    //   }
    //   state.loading = false;
    //   state.error = null;
    //   state.message = `Post "${action.payload.author}" deleted successfully.`;
    // },
  }
})

export const {
//   getPostsStart,
//   getPostsSuccess,
  usersFailure,
//   selectPostById,
//   getPostByIdStart,
//   getPostByIdSuccess,
  createUserStart,
  createUserSuccess,
//   updatePostStart,
//   updatePostSuccess,
//   deletePostByIdStart,
//   deletePostByIdSuccess,
} = users.actions
export default users.reducer

// export const fetchPosts = (): AppThunk => async (dispatch) => {
//   try {
//     dispatch(getPostsStart())
//     const localPosts = localStorage.getItem('posts');
//     if (localPosts) {
//       console.log(localPosts);
//       dispatch(getPostsSuccess({ posts: JSON.parse(localPosts) as Post[] }));
//     }
//     const posts = await PostService.getAllPosts()
//     dispatch(getPostsSuccess({ posts }))
//     localStorage.setItem('posts', JSON.stringify(posts));
//   } catch (err) {
//     dispatch(postsFailure(getErrorMessage(err)))
//   }
// } 

// export const fetchPostById = (postId: IdType): AppThunk => async (dispatch) => {
//   try {
//     dispatch(getPostByIdStart(postId));
//     const post = await PostService.getPostById(postId);
//     dispatch(getPostByIdSuccess(post));
//   } catch (err) {
//     dispatch(postsFailure(getErrorMessage(err)))
//   }
// }

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
    history.push('/posts');
  } catch (err) {
    dispatch(usersFailure(getErrorMessage(err)))
  } 
  // finally {
  //   setSubmitting(false);
  // }
}

// export const updatePost = (
//   post: Post, 
//   history: History<History.PoorMansUnknown>, 
//   // setSubmitting: (isSubmitting: boolean) => void
//   ): AppThunk => async (dispatch) => {
//   try {
//     dispatch(updatePostStart(post));
//     const created = await PostService.updatePost(post);
//     dispatch(updatePostSuccess(created));
//     history.push('/posts');
//   } catch (err) {
//     dispatch(postsFailure(getErrorMessage(err)))
//   } 
//   // finally {
//   //   setSubmitting(false);
//   // }
// }

// export const deletePost = (postId: IdType): AppThunk => async (dispatch) => {
//   try {
//     dispatch(deletePostByIdStart(postId));
//     const deleted = await PostService.deletePost(postId);
//     dispatch(deletePostByIdSuccess(deleted));
//   } catch (err) {
//     dispatch(postsFailure(getErrorMessage(err)))
//   }
// }
