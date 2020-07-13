import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { ReactElement, useRef } from 'react';
import { submitLogin } from '../../features/auth/authSlice';


export default function Login(): ReactElement {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const history = useHistory();
  
    function login(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      dispatch(submitLogin({
        username: usernameRef.current?.value || '',
        password: passwordRef.current?.value || ''
      }, history));
    }
    return (
        <form noValidate onSubmit={login}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Username" name="username" required autoFocus ref={usernameRef}/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Password" name="password" required  ref={passwordRef}/>

            <button type="submit">Login</button>
            <button type="button" onClick={goBack} className="btn red waves-effect waves-light" >Cancel <i className="material-icons right">settings_backup_restore</i></button>
        </form>
    )
    function goBack(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
      event.preventDefault();
      history.push("/");
  }
}