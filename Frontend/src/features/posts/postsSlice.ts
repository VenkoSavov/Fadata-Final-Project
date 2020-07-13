import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { History } from 'history';

import { AppThunk } from '../../app/store';
import { Post } from '../../model/post.model';
import PostService from '../../service/post-service';
import { getErrorMessage } from '../../service/service-utils';
import { IdType } from '../../shared/shared-types';

interface PostsState {
  currentPostId: IdType | null;
  posts: Post[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

interface PostsLoaded {
  posts: Post[];
}

const initialState: PostsState = {
  currentPostId: null,
  posts: [],
  loading: false,
  error: null,
  message:null
}

const posts = createSlice({
  name: 'posts',
  initialState, 
  reducers: {
    getPostsStart(state) {
      state.loading = true
      state.error = null
    },
    getPostsSuccess(state, action: PayloadAction<PostsLoaded>) {
      const { posts } = action.payload;
      state.posts = posts;
      state.loading = false;
      state.error = null;
    }, 
    postsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    selectPostById(state, action: PayloadAction<IdType>) {
      state.currentPostId = action.payload;
    },
    getPostByIdStart(state, action: PayloadAction<IdType>) {
      state.currentPostId = action.payload;
      state.loading = true;
      state.error = null;
    },
    getPostByIdSuccess(state, action: PayloadAction<Post>) {
      const post = action.payload;
      const index = state.posts.findIndex(p => p._id === post._id);
      if (index < 0) {
        state.posts.push(post)
      } else {
        state.posts[index] = post;
      }
      state.loading = false;
      state.error = null;
    },
    createPostStart(state, action: PayloadAction<Post>) {
      state.currentPostId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    createPostSuccess(state, action: PayloadAction<Post>) {
      const post = action.payload;
      state.posts.push(post)
      state.loading = false;
      state.error = null;
      state.message = `Post "${action.payload.author}" created successfully.`;
    },
    updatePostStart(state, action: PayloadAction<Post>) {
      state.currentPostId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    updatePostSuccess(state, action: PayloadAction<Post>) {
      const post = action.payload;
      const index = state.posts.findIndex(p => p._id === post._id);
      if (index < 0) {
        state.posts.push(post)
      } else {
        state.posts[index] = post;
      }
      state.loading = false;
      state.error = null;
      state.message = `Post "${action.payload.author}" updated successfully.`;
    },
    deletePostByIdStart(state, action: PayloadAction<IdType>) {
      state.currentPostId = action.payload;
      state.loading = true;
      state.error = null;
    },
    deletePostByIdSuccess(state, action: PayloadAction<Post>) {
      const post = action.payload;
      const index = state.posts.findIndex(p => p._id === post._id);
      if (index >= 0) {
        state.posts.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
      state.message = `Post "${action.payload.author}" deleted successfully.`;
    },
    acceptPostStart(state, action: PayloadAction<Post>) {
      state.currentPostId = action.payload._id;
      state.loading = true;
      state.error = null;
    },
    acceptPostSuccess(state, action:PayloadAction<Post>) {
      const post = action.payload;
      const index = state.posts.findIndex(p => p._id === post._id);
      post.isAccepted = true;
      console.log(JSON.stringify(post));
      
      if (index < 0) {
        state.posts.push(post)
      } else {
        state.posts[index] = post;
      }
      state.loading = false;
      state.error = null;
    }
  }
})

export const {
  getPostsStart,
  getPostsSuccess,
  postsFailure,
  selectPostById,
  getPostByIdStart,
  getPostByIdSuccess,
  createPostStart,
  createPostSuccess,
  updatePostStart,
  updatePostSuccess,
  deletePostByIdStart,
  deletePostByIdSuccess,
  acceptPostStart,
  acceptPostSuccess
} = posts.actions
export default posts.reducer

export const fetchPosts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getPostsStart())
    const localPosts = localStorage.getItem('posts');
    if (localPosts) {
      console.log(localPosts);
      dispatch(getPostsSuccess({ posts: JSON.parse(localPosts) as Post[] }));
    }
    const posts = await PostService.getAllPosts()
    dispatch(getPostsSuccess({ posts }))
    localStorage.setItem('posts', JSON.stringify(posts));
  } catch (err) {
    dispatch(postsFailure(getErrorMessage(err)))
  }
} 

export const fetchPostById = (postId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(getPostByIdStart(postId));
    const post = await PostService.getPostById(postId);
    dispatch(getPostByIdSuccess(post));
  } catch (err) {
    dispatch(postsFailure(getErrorMessage(err)))
  }
}

export const createPost = (
  post: Post, 
  history: History<History.PoorMansUnknown>, 
  // setSubmitting: (isSubmitting: boolean) => void
  ): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(createPostStart(post));
    const authToken = getState().auth.token;
    const created = await PostService.createNewPost(post, authToken);
    dispatch(createPostSuccess(created));
    history.push('/posts');
  } catch (err) {
    dispatch(postsFailure(getErrorMessage(err)))
  } 
  // finally {
  //   setSubmitting(false);
  // }
}

export const updatePost = (
  post: Post, 
  history: History<History.PoorMansUnknown>, 
  // setSubmitting: (isSubmitting: boolean) => void
  ): AppThunk => async (dispatch) => {
  try {
    dispatch(updatePostStart(post));
    const created = await PostService.updatePost(post);
    dispatch(updatePostSuccess(created));
    history.push('/posts');
  } catch (err) {
    dispatch(postsFailure(getErrorMessage(err)))
  } 
  // finally {
  //   setSubmitting(false);
  // }
}

export const deletePost = (postId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(deletePostByIdStart(postId));
    const deleted = await PostService.deletePost(postId);
    dispatch(deletePostByIdSuccess(deleted));
  } catch (err) {
    dispatch(postsFailure(getErrorMessage(err)))
  }
}

export const acceptPost = (
  post: Post, 
  history: History<History.PoorMansUnknown>,
  // setSubmitting: (isSubmitting: boolean) => void
  ): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(acceptPostStart(post));
    // const acceptedBy = getState().auth.loggedUser;
    console.log(JSON.stringify(post));
    
    const created = await PostService.updatePost(post);
    dispatch(acceptPostSuccess(created));
    history.push('/posts');
  } catch (err) {
    dispatch(postsFailure(getErrorMessage(err)))
  } 
}