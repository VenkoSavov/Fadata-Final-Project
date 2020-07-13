import * as React from 'react';
import { Post } from '../../model/post.model';
import './PostItem.css';
import { PostCallback } from '../../shared/shared-types';
import { Marked } from '@ts-stack/markdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

interface Props {
  post: Post;
  onEditPost: PostCallback;
  onDeletePost: PostCallback;
  onAcceptPost: PostCallback;

}

const rawMarkup = (markdownText: string) => (
  {__html :Marked.parse(markdownText)}
);

export const PostItem: React.FC<Props> = ({post, onEditPost, onDeletePost, onAcceptPost}) => {
  let user = useSelector((state: RootState) => state.auth.loggedUser);

  const handleAccept = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onAcceptPost(post);
  }
  
  const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onEditPost(post);
  }
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onDeletePost(post);
  }
 
  return (
    <div className="PostItem-card-wrapper col s12 m6 l6 xl4 Post-card">
      <div className="card">
        <div className="PostItem-card-image waves-effect waves-block waves-light">
          <img
            className="activator PostItem-image"
            src={post.imageUrl ? post.imageUrl : '/img/no-image.png'}
            alt="front page"
          />
        </div>
        <div className="PostItem-card-content">
          <div className="card-title activator grey-text text-darken-4">
            <div className="PostItem-title">
              <strong>{post.author}</strong>
            </div>
            <div className="PostItem-tags">
              {post.kidsNames?.map((name, index) => (
                <div key={index} className="chip name">{name}</div>
              ))}
              {post.kidsAge?.map((age, index) => (
                <div key={index + 1000} className="chip age">{age}</div>
              ))}
            </div>
            <i className="material-icons right">more_vert</i>
          </div>
          <hr className="style-two"/>
          {/* <p dangerouslySetInnerHTML={rawMarkup(post.text)}></p> */}
          <div className="h-align-items black-text text-lighter-1"><i className="margin-right-small material-icons small">home</i> {post.location}</div>
          <div className="h-align-items black-text text-lighter-1"><i className="margin-right-small material-icons small">date_range</i> {post.date} <i className="margin-left-small material-icons small">access_time</i> {post.timeFrom} - {post.timeTo}</div>
    
          <div className="PostItem-card-actions card-action">
            {post.isAccepted && user?._id === post.authorId? <button className="btn waves-effect waves-light green lighten-2 pulse" onClick={handleDelete}>Complete</button>: null}
              {post.isAccepted? <span className="h-align-items "><i className="material-icons margin-right-small">check_circle</i> {post.acceptedBy}</span> : null}
            {user?.roles === '0' || post.isAccepted? null : <button className="btn waves-effect waves-light pink lighten-2 pulse" onClick={handleAccept}>Accept offer!</button>}
            <div className="PostItem-buttons-right">
              {user?._id === post.authorId && post.isAccepted === false?<button className="btn waves-effect waves-light" title="EDIT Post" onClick={handleEdit}>
                <i className="material-icons">create</i>
              </button>: null}
              {user?._id === post.authorId && post.isAccepted === false?<button className="btn danger waves-effect waves-light" title="DELETE Post" onClick={handleDelete}>
                <i className="material-icons">delete</i>
              </button>: null}
            </div>
          </div>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {post.author}
            <i className="material-icons right">close</i>
          </span>
          <p className="PostText" dangerouslySetInnerHTML={rawMarkup(post.text)}></p>
        </div>
      </div>
    </div>
  );
};
