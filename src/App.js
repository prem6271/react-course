import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [showClear, setshowClear] = useState(false);
  const [alert, setAlert] = useState(null);

  /* async componentDidMount() {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //console.log(res.data);
    this.setState({users : res.data, loading: false});
  }
  */
  // Setting State
  const searchingUsers = async user => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${user}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //console.log(res.data);
    setUsers(res.data.items);
    setLoading(false);
    setshowClear(true);
  }

  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //console.log(res.data);
    setUser(res.data);
    setLoading(false);
  }

  // Clearing State
  const clearingUsers = () => {
    setUsers([]);
    setLoading(false);
    setshowClear(false);
    setAlert(null);
  };

  const settingAlert = (message, type) => {
    setAlert({message: message, type : type});
    setTimeout(() => setAlert(null),5000);
  }

  return (
    // looks like html, but it is JSX i.e. JS syntax extension
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          {
            alert && <Alert alert={alert}/>
          }
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search
                  searchUsers={searchingUsers}
                  clearUsers={clearingUsers}
                  showClear={showClear}
                  setAlert={settingAlert}
                />
                <Users loading={loading} users={users}/>
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} loading={loading} user={user} getUser={getUser}/>
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );

}

export default App;
