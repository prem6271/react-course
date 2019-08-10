import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search users
  const searchingUsers = async user => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${user}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }
  // Get user

  // Clear user
  const clearUsers = () => dispatch({type: CLEAR_USERS});

  // Set Loading
  const setLoading = () => dispatch({type: SET_LOADING});

  return (
    <GithubContext.Provider
      value = {
        {
          users: state.users,
          user: state.user,
          loading: state.loading,
          searchingUsers,
          clearUsers
        }
      }
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState
