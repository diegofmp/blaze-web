import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';  

//bootstrap stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CustomerService from './shared/customersService';

class App extends React.Component{
  constructor(props){
    super(props);
    this.customerService = new CustomerService();
    this.state = {
      columnDefs: [{
        headerName: "Name", field: "firstName", checkboxSelection: true,sortable: true, filter: true
      }, {
        headerName: "Last Name", field: "lastName", sortable: true, filter: true
        },{
        headerName: "Email", field: "email", sortable: true, filter: true
      },{
        headerName: "Phone", field: "phoneNumber", sortable: true, filter: true
      }
    ],
      rowData: null
    };
  }

  getCustomers() {
    axios.get('http://localhost:8080/customers')
      .then(result => result.data)
      .then(rowData => this.setState({rowData}))
  }

  componentDidMount() {
    this.getCustomers();
  }

  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
  }

  render(){
    return (
      <Router>
        <div className="container" 
        style={{width: 'auto'}}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/index'} className="navbar-brand">Blaze Demo</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              </ul>
            </div>
          </nav> <br/>
          <Switch>
              <Route exact path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
