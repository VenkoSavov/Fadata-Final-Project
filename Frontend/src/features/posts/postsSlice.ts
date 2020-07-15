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
  filter: string | undefined;
}

interface PostsLoaded {
  posts: Post[];
}

const initialState: PostsState = {
  currentPostId: null,
  posts: [],
  loading: false,
  error: null,
  message:null,
  filter: undefined
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
      state.message = `Post created successfully.`;
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
      state.message = `Post updated successfully.`;
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
      state.message = `Post deleted successfully.`;
    },
    completePostByIdStart(state, action: PayloadAction<IdType>) {
      state.currentPostId = action.payload;
      state.loading = true;
      state.error = null;
    },
    completePostByIdSuccess(state, action: PayloadAction<Post>) {
      const post = action.payload;
      const index = state.posts.findIndex(p => p._id === post._id);
      if (index >= 0) {
        state.posts.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
      state.message = `Post completed successfully.`;
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
    },
    filterByValueStart(state) {
      state.loading = true
      state.error = null
    },
    filterByValueSuccess(state, action: PayloadAction<string>) {
      let value = action.payload;
      let filteredValues = state.posts.filter(post => post.location.toLowerCase().includes(value));
      return {...state,value, filteredValues};
    }, 
    filterChangeStart(state) {
      state.loading = true
      state.error = null
    },
    filterChangeSuccess(state, action: PayloadAction<string>) {
      state.filter = action.payload;
      
    }, 
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
  acceptPostSuccess,
  filterByValueStart,
  filterByValueSuccess,
  filterChangeStart,
  filterChangeSuccess,
  completePostByIdStart,
  completePostByIdSuccess,
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
    history.push('/profileP');
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
  ): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(updatePostStart(post));
    const created = await PostService.updatePost(post);
    dispatch(updatePostSuccess(created));
    const user = getState().auth.loggedUser
    if(user?.roles === '0'){
    history.push('/profileP');
    } else {
      history.push('/');
    }
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
export const completePost = (postId: IdType): AppThunk => async (dispatch) => {
  try {
    dispatch(completePostByIdStart(postId));
    const completed = await PostService.deletePost(postId);
    dispatch(completePostByIdSuccess(completed));
  } catch (err) {
    dispatch(postsFailure(getErrorMessage(err)))
  }
}

export const acceptPost = (
  post: Post, 
  history: History<History.PoorMansUnknown>,
  // setSubmitting: (isSubmitting: boolean) => void
  ): AppThunk => async (dispatch) => {
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

export const filterByValue = ( 
  searchText: string
  // setSubmitting: (isSubmitting: boolean) => void
  ): AppThunk => async (dispatch) => {
    try {
      dispatch(filterByValueStart());
      dispatch(filterByValueSuccess(searchText))
    } catch (err) {
      dispatch(postsFailure(getErrorMessage(err)))
    }
  }

  export const filterChange = ( 
    searchText: string
    // setSubmitting: (isSubmitting: boolean) => void
    ): AppThunk => async (dispatch) => {
      try {
        dispatch(filterChangeStart());
        dispatch(filterChangeSuccess(searchText))
      } catch (err) {
        dispatch(postsFailure(getErrorMessage(err)))
      }
    }