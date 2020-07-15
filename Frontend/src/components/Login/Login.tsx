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
      <div className="col s12">
        <div className="formContainer section">
        <form noValidate onSubmit={login} className="row">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Username" name="username" required autoFocus ref={usernameRef}/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Password" name="password" required  ref={passwordRef}/>
          <div className="center PostForm-butons">
            

            <button type="submit" className="btn waves-effect waves-light"><i className="material-icons right">send</i>Login</button>
            <button type="button" onClick={goBack} className="btn red waves-effect waves-light" >Cancel <i className="material-icons right">settings_backup_restore</i></button>
            </div>
        </form>
        <br/><br/>
        <p className="center">Don't have an account? <a href="/register">Click here</a> to Register!</p>
        
        </div>
        </div>
    )
    function goBack(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
      event.preventDefault();
      history.push("/");
  }
}