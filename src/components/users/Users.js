import React from 'react';
import Spinner from '../layout/Spinner';
import Useritem from './Useritem';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {    
    if (loading) {
      return <Spinner />
    } else {
      return (
        <div style={userStyle}>
          {users.map(user => (
            <Useritem key={user.id} user={user} />
          ))}
        </div>
      );
    }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1'
}

export default Users;
