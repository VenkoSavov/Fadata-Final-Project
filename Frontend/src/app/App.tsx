import './App.css';

import React, { useEffect } from 'react';

import Header from '../components/Header/Header';
import Nav from '../components/Nav/Nav';
import { PostList } from '../components/PostList/PostList';
import { UserList } from '../components/Users/UserList/UserList'
import { Post } from '../model/post.model';
import { StringCallback, PostCallback, UserCallback, CallbackUser } from '../shared/shared-types';
import { PostForm } from '../components/PostForm/PostForm';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, filterByValue, filterChange, completePost } from '../features/posts/postsSlice';
import { RootState } from './rootReducer';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import Login from '../components/Login/Login';
import { AcceptForm } from '../components/AcceptForm/AcceptForm';
import { User } from '../model/user.model';
import { logout } from '../features/auth/authSlice';
import { ParentList } from '../components/ParentList/ParentList';
import { BabySitterList } from '../components/BabySitterList/BabySitterList';
import ChooseFilter from '../components/ChooseFilter/ChooseFilter';
import Alert from '../components/Alert/Alert';
import { deleteUser, fetchUsers } from '../features/users/usersSlice';

// import MOCK_POSTS from './model/mock-posts';
export interface PostAction {
  type: string;
  post: Post;
}

// function postsReducer(state: Post[], action: PostAction) {
//   switch (action.type) {
//     case 'add':
//       return [...state, action.post];
//     // ... other actions ...
//     default:
//       return state;
//   }
// }


function App() {
  

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

 
 const posts = useSelector((state: RootState) => state.posts.posts);
 const users = useSelector((state: RootState) => state.users.users);
 let filter = useSelector((state: RootState) => state.posts.filter);
 const errors = useSelector((state:RootState) => {
   return state.posts.error;
 })
 const errorsAuth = useSelector((state:RootState) => {
  return state.auth.error;
})
const errorsUsers = useSelector((state:RootState) => {
  return state.users.error;
})
 const messages = useSelector((state: RootState) => {
  return state.posts.message;
});
const messagesUsers = useSelector((state: RootState) => {
  return state.users.message;
});

 let loggedUser = useSelector((state: RootState) => {
   return state.auth.loggedUser;
 })

  const handleEditPost: PostCallback = (post) => {
    history.push(`/edit-post/${post._id}`);
  };

  const handleDeletePost: PostCallback = (post) => {

    dispatch(deletePost(post._id));
  };
  const handleCompletePost: PostCallback = (post) => {

    dispatch(completePost(post._id));
  };

  const handleAcceptPost: PostCallback = (post) => {
    if(loggedUser){
    history.push(`/accept-post/${post._id}`)
  } else{
    history.push(`/login`);
  }
  };

  const handleSearch: StringCallback = (searchText) =>{
    dispatch(filterByValue(searchText))
  };

  const handleFilterChange = (filter: string) => {
    dispatch(filterChange(filter));
  }

  const handleEditUser: CallbackUser = (user) => {
    history.push(`/edit-user/${user._id}`);
  };

  const handleDeleteUser: CallbackUser = (user) => {

    dispatch(deleteUser(user._id));
  };
  const handleLogout: UserCallback = (user: User | undefined) => {
    // dispatch(logout(user, history))
    dispatch(logout());

  };




  return (
    <React.Fragment>
      <Nav onSearchPosts={handleSearch}  onLogout={handleLogout} />
      <div className="section no-pad-bot" id="index-banner">
        <div className="container" >
          <Switch>
            <Route exact path="/">
              <Redirect to="/posts" />
            </Route>
            <Route exact path="/profileP">
              <ParentList posts={posts} onEditPost={handleEditPost} onDeletePost={handleDeletePost} onCompletePost={handleCompletePost} onAcceptPost={handleAcceptPost} />
            </Route>
            <Route exact path="/profileS">
              <BabySitterList  posts={posts} onEditPost={handleEditPost} onDeletePost={handleDeletePost} onCompletePost={handleCompletePost} onAcceptPost={handleAcceptPost} />
            </Route>
            <Route exact path="/posts">
            <Header />
            <ChooseFilter filter={filter} onFilterChange={handleFilterChange}/>
              <PostList posts={posts} onEditPost={handleEditPost} filter={filter} onDeletePost={handleDeletePost} onCompletePost={handleCompletePost} onAcceptPost={handleAcceptPost}/>
            </Route>
            <Route exact path="/users">
              <UserList users={users} onDeleteUser={handleDeleteUser} onEditUser={handleEditUser}/>
            </Route>
            <Route exact path="/add-post">
              <PostForm />
            </Route>
            <Route exact path="/register">
              <div className="center"><h2>Register</h2></div>
              <RegisterForm />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/accept-post/:postId">
              <AcceptForm/>
            </Route>
            <Route exact path="/edit-post/:postId">
              <PostForm />
            </Route>
            <Route exact path="/edit-user/:postId">
              <RegisterForm />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer/>
      {errors && (<Alert key={errors} severity="error">{errors}</Alert>)}
      {errorsUsers && (<Alert key={errorsUsers} severity="error">{errorsUsers}</Alert>)}
      {errorsAuth && (<Alert key={errorsAuth} severity="error">{errorsAuth}</Alert>)}
      {messages && (<Alert key={messages} severity="success">{messages}</Alert>)}
      {messagesUsers && (<Alert key={messagesUsers} severity="success">{messagesUsers}</Alert>)}
    </React.Fragment>
  );
}




export default App;
