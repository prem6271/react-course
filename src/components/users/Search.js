import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({searchUsers, showClear, clearUsers, setAlert}) =>  {
  const [text, setText] = useState('');

  const onchange = (e) => {
    setText(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      setAlert("Enter a valid text...", "dark");
    } else {
      searchUsers(text);
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
      { showClear  &&
        (<button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>)
      }
    </div>
  );

}


  Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  }
export default Search;
