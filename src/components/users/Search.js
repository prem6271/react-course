import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({setAlert}) =>  {
  const githubContext = useContext(GithubContext);

  const [text, setText] = useState('');

  const onchange = (e) => {
    setText(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      setAlert("Enter a valid text...", "dark");
    } else {
      githubContext.searchingUsers(text);
      setText('');
    }
  }

  return (
    <div>
      <form className="form" onSubmit={onSubmit} >
        <input
          type="text"
          name="text"
          placeholder="Search Users ... "
          value={text}
          onChange={onchange}
        />
        <input type="submit" value="Search" className="btn btn-dark btn-block"/>
      </form>
      { githubContext.users.length > 0  &&
        (<button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>)
      }
    </div>
  );

}


  Search.propTypes = {
    setAlert: PropTypes.func.isRequired
  }
export default Search;
