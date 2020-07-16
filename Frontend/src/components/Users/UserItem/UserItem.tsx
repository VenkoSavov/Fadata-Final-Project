import * as React from 'react';
import { User } from '../../../model/user.model';
import {  CallbackUser } from '../../../shared/shared-types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';

interface Props {
  user: User;
  onEditUser: CallbackUser;
  onDeleteUser: CallbackUser;

}


export const UserItem: React.FC<Props> = ({user, onEditUser, onDeleteUser}) => {

  const loggedUser = useSelector((state: RootState) => state.auth.loggedUser );
  
  const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onEditUser(user);
  }
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onDeleteUser(user);
  }
  
 
  return (
      <tr>
        <td> <img alt="Avatar" style={{width:60, height:60}}  src={user.imageUrl}/></td>
        <td>{user.firstName}</td>                             
        <td>{user.lastName}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>                             
        <td>{user.roles}</td>
        <td>{loggedUser?.roles !== '2'? null : <button className="btn waves-effect waves-light red" title="DELETE User" onClick={handleDelete}>
                <i className="material-icons">delete</i>
  </button>}</td>                             
        <td>{loggedUser?.roles !== '2'? null :<button className="btn waves-effect waves-light" title="EDIT User" onClick={handleEdit}>
                <i className="material-icons">create</i>
  </button>}</td>
      </tr>
  );
};
