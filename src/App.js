import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    user:{},
    users: [],
    loading: false,
    showClear: false,
    alert: null
  }
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
  searchingUsers = async user => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${user}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //console.log(res.data);
    this.setState({users : res.data.items, loading: false, showClear: true});
  }

  getUser = async username => {
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //console.log(res.data);
    this.setState({user : res.data, loading: false});
  }

  // Clearing State
  clearingUsers = () =>
    this.setState( {
      users: [],
      loading: false,
      showClear: false,
      alert: null
      }
    );

  settingAlert = (message, type) => {
    this.setState( {
        alert: { message: message, type : type }
      }
    );
    setTimeout(function(){
             this.setState({alert:null});
    }.bind(this),5000);
  }
  render() {
    return (
      // looks like html, but it is JSX i.e. JS syntax extension
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            {
              this.state.alert && <Alert alert={this.state.alert}/>
            }
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchingUsers}
                    clearUsers={this.clearingUsers}
                    showClear={this.state.showClear}
                    setAlert={this.settingAlert}
                  />
                  <Users loading={this.state.loading} users={this.state.users}/>
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} loading={this.state.loading} user={this.state.user} getUser={this.getUser}/>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
