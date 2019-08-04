import React, {Component, Fragment} from 'react';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';

class User extends Component {
  componentDidMount() {
    // login comes from props
    this.props.getUser(this.props.match.params.login);
  }
  
  render () {
    const {
      name,
      avatar_url,
      location,
      html_url,
      hireable
    } = this.props.user;
    if (this.props.loading) {
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
}
export default User;
