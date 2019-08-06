import React, {useEffect, Fragment} from 'react';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const User = ({user, loading, getUser, match }) => {
  useEffect(() => {
    getUser(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    hireable
  } = user;

  if (loading) {
    return <Spinner />
  } else {
    return (
      <Fragment>
        <Link to='/' className="btn btn-light">
          Back to Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
      </Fragment>
    )
  }
}

User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired
}

export default User;
