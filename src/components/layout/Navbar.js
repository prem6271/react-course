import React  from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Navbar = (props) =>  {
  return (
    // looks like html, but it is JSX i.e. JS syntax extension
    <nav className="navbar bg-primary">
      <h1>
        <i className={props.icon} /> {props.title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
}

Navbar.defaultProps = {
  title: 'GitHub Finder',
  icon: 'fab fa-github'
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}
export default Navbar;
