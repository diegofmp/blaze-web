import React from 'react';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

//bootstrap stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import IndexBootstrap from './components/indexBootstrap.component';

class App extends React.Component{
  constructor(props){
    const name = "MY APP hehe";
    super(props);
  }

  render(){
    return (
      <Router>
        <div className="container" 
        style={{width: 'auto'}}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/bootstrap'} className="navbar-brand">Blaze Demo</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/bootstrap">Bootstrap <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/index">Ag-grid <span className="sr-only">(current)</span></a>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <Switch>
              <Route exact path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
              <Route path='/bootstrap' component={ IndexBootstrap }/> 
              <Route path='/' component={ IndexBootstrap }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
