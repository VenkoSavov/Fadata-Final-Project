import * as React from 'react';
import { Post } from '../../model/post.model';
import { ReactElement } from 'react';
import { PostItem } from '../PostItem/PostItem';
import { PostCallback } from '../../shared/shared-types';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import './ParentList.css'

interface Props {
  posts: Post[];
  onEditPost: PostCallback;
  onDeletePost: PostCallback;
  onAcceptPost: PostCallback;
  onCompletePost: PostCallback;
}

export function ParentList({ posts, ...rest }: Props): ReactElement<Props> {
  const user = useSelector((state:RootState) => {
    return state.auth.loggedUser
  })
  return (
    <React.Fragment>
      <Header />
      <h3 className="center white-text cool-font">My Pending Babysitting Posts!</h3>
      <hr className="style-seven"/>
      <div className="section row">
        {posts.filter(post => post.authorId === user?._id && post.isAccepted === false).map(post => (<PostItem post={post} key={post._id} {...rest} />))}
      </div>
      <h3 className="center white-text cool-font">My Accepted Babysitting Posts!</h3>
      <hr className="style-seven"/>
      <div className="section row">
        {posts.filter(post => post.authorId === user?._id && post.isAccepted).map(post => (<PostItem post={post} key={post._id} {...rest} />))}
      </div>
    </React.Fragment>
  );
};
