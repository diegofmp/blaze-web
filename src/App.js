import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';  

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
    //this.customerService.retrieveCustomers()
    /* fetch('http://localhost:8080/customers')
    .then(result => result.json())
    .then(rowData => this.setState({rowData})) */
  }

  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
  }


  handleSubmit() {
    console.log("SUBMIT ADDDDDDDDD");
    //e.preventDefault();
    const employee = {
      firstName: "Luis",
      lastName: "Serpa",
      email: "lserpa@gmail.com",
      phoneNumber: "999777555",
    }
    axios.post('http://localhost:8080/customers', employee)
    .then(res => console.log(res));
  }

  deleteSelected = e => {
    //e.preventDefault();
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    console.log("SELECTED DATA: ", selectedData)
    if(selectedData.length){
      //delete first
      let id = selectedData[0].id;
      console.log("GONNA DELETE: ", id)
      axios.delete('http://localhost:8080/customers/'+id)
	    .then(res => console.log(res.data));
    }
    //console.log("SELECTED DATA: ", selectedData)
    //const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
    //alert(`Selected nodes: ${selectedDataStringPresentation}`)

	  //axios.delete('http://dummy.restapiexample.com/api/v1/delete/{this.state.id}')
//	    .then(res => console.log(res.data));
  }

  render(){
    return(
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: 'auto',
        padding: '20px' }}
      >
        <button onClick={this.onButtonClick}>Get selected rows</button>
        <button onClick={this.deleteSelected}>Delete selected</button>
        <AgGridReact
          onGridReady={ params => this.gridApi = params.api }
          rowSelection="multiple"
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}>
        </AgGridReact>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Phone number:
            <input type="phone" name="phoneNumber" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default App;
