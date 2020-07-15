import * as React from 'react';
import { Post } from '../../model/post.model';
import { ReactElement } from 'react';
import { PostItem } from '../PostItem/PostItem';
import { PostCallback } from '../../shared/shared-types';
import './PostList.css'

interface Props {
  posts: Post[];
  filter: string | undefined;
  onEditPost: PostCallback;
  onDeletePost: PostCallback;
  onAcceptPost: PostCallback;
  onCompletePost: PostCallback;
}

export function PostList({ posts,filter, ...rest }: Props): ReactElement<Props> {
  return (
    <React.Fragment>
      <div className="row">
        {posts.filter(post => !filter ? true: post.location === filter).map(post => (<PostItem post={post} key={post._id} {...rest} />))}
        {/* {posts.filter(post => post.isAccepted !== true).map(post => (<PostItem post={post} key={post._id} {...rest} />))} */}
      </div>
    </React.Fragment>
  );
};
