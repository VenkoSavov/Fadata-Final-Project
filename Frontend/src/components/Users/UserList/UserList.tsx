import * as React from 'react';
import { User } from '../../../model/user.model';
import { ReactElement } from 'react';
import { CallbackUser } from '../../../shared/shared-types';
import { UserItem } from '../UserItem/UserItem';

interface Props {
  users: User[];
  onEditUser: CallbackUser;
  onDeleteUser: CallbackUser;
}

export function UserList({ users, ...rest }: Props): ReactElement<Props> {
  return (
    <React.Fragment>
      <div>
      <table className="stripped">
    <thead>
      <tr>
          <th>Avatar</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
      </tr>
    </thead>
    <tbody>
    {users.map(user => (<UserItem user={user} key={user._id} {...rest} />))}
    </tbody>
  </table>
        
        {/* {posts.filter(post => post.isAccepted !== true).filter(post => !filter ? true: post.location === filter).map(post => (<PostItem post={post} key={post._id} {...rest} />))} */}
      </div>
    </React.Fragment>
  );
};