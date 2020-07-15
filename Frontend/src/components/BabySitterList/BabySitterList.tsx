import * as React from 'react';
import { Post } from '../../model/post.model';
import { ReactElement } from 'react';
import { PostItem } from '../PostItem/PostItem';
import { PostCallback } from '../../shared/shared-types';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

interface Props {
  posts: Post[];
  onEditPost: PostCallback;
  onDeletePost: PostCallback;
  onAcceptPost: PostCallback;
  onCompletePost: PostCallback;
}

export function BabySitterList({ posts, ...rest }: Props): ReactElement<Props> {
  const user = useSelector((state:RootState) => {
    return state.auth.loggedUser
  })
  return (
    <React.Fragment>
      <Header />
      <h3 className="center white-text cool-font">My Accepted offers!</h3>
      <hr className="style-seven"/>
      <div className="section row">
        {posts.filter(post => post.acceptedBy === user?.username).map(post => (<PostItem post={post} key={post._id} {...rest} />))}
      </div>
    </React.Fragment>
  ); 
};
