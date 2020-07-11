/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, ReactElement } from "react";
import "./Nav.css";
import { StringCallback, PostCallback, UserCallback } from "../../shared/shared-types";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import {User} from '../../model/user.model'

interface Props {
  onSearchPosts: StringCallback;
  onLogout: UserCallback;
}

export default function Nav({
   onSearchPosts, onLogout
}: Props): ReactElement<Props> {
  const [searchText, setSearchText] = useState("");
  let user = useSelector((state: RootState) => state.auth.loggedUser);
  return (
    <React.Fragment>
      <div className="navbar">
        <nav className="light-red lighten-5" role="navigation">
          <div className="nav-wrapper container">
            <NavLink
              to="/"
              activeClassName="active"
              id="logo-container"
              className="brand-logo"
            >
              <i className="material-icons">child_friendly</i>
            </NavLink>
            <a data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
            {user !== undefined? <li><strong>Hello, {user.firstName}</strong></li>: null}
            {user?.roles === '0' ? 
                <li>
                  <NavLink to="/profileP"   activeClassName="active">
                    My Profile
                  </NavLink>
                </li>
               : null}
              {user?.roles === '1'? 
              <li>
              <NavLink to="/profileS"   activeClassName="active">
                My Profile
              </NavLink>
            </li>: null}
              {user !== undefined ? (
                <li>
                  <NavLink to="/posts"  onClick={handleLogout} activeClassName="active">
                    Logout
                  </NavLink>
                </li>
              ) : null}
              {user === undefined ? (
                <li>
                  <NavLink to="/login" activeClassName="active">
                    Login
                  </NavLink>
                </li>
              ) : null}
              {user === undefined ? (
                <li>
                  <NavLink to="/register" activeClassName="active">
                    Register
                  </NavLink>
                </li>
              ) : null}
              <li>
                <NavLink to="/posts" activeClassName="active">
                  Posts
                </NavLink>
              </li>
              
              <li>
                <NavLink to="/add-post" activeClassName="active">
                  Add Post
                </NavLink>
              </li>
                 
              <li>
                <form>
                  <div className="input-field">
                    <input
                      type="search"
                      placeholder="search"
                      id="autocomplete-input"
                      className="Nav-search-input"
                      onChange={handleTextChanged}
                      value={searchText}
                    />
                    <i
                      className="material-icons Nav-button"
                      onClick={submitSearch}
                    >
                      search
                    </i>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="sass.html">Sass</a>
        </li>
        <li>
          <a href="badges.html">Components</a>
        </li>
        <li>
          <a href="collapsible.html">Javascript</a>
        </li>
        <li>
          <a href="mobile.html">Mobile</a>
        </li>
      </ul>
    </React.Fragment>
  );

  function handleTextChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function submitSearch(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    onSearchPosts(searchText);
    setSearchText("");
  }
  function handleLogout(event: React.MouseEvent<HTMLElement, MouseEvent>){
    onLogout(user);
  }
}
