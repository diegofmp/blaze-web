import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';  
import Button from 'react-bootstrap/Button';

import CustomerService from '../shared/customersService';


export default class Index extends Component {

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
            rowData: null,
            rowSelected : false
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
            .then(res =>{console.log(res.data); this.getCustomers();});
        }        
    }
    editSelected = e => {
        //e.preventDefault();
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        console.log("SELECTED DATA: ", selectedData)
        if(selectedData.length){
          //delete first
          let id = selectedData[0].id;
          console.log("GONNA DELETE: ", id)
          this.props.history.push('/edit/'+id)
        }        
    }

    goCreate = e => {
        this.props.history.push('/create/')
    }

    setSelectFlag = e => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data )
        this.setState({ rowSelected: !!selectedData.length })
    }

    render() {
        return(
            <div
                className="ag-theme-balham"
                style={{
                height: '500px',
                width: 'auto',
                padding: '20px' }}
            >
                <div style={{display: 'flex',justifyContent: 'space-between',paddingBottom: '15px'}}>
                    <Button onClick={this.goCreate} variant="success">Create Customer</Button>{' '}
                    <div>
                        <Button onClick={this.editSelected} disabled={!this.state.rowSelected} variant="info">Edit Selected</Button>{' '}
                        <Button onClick={this.deleteSelected} disabled={!this.state.rowSelected} variant="danger">Delete Selected</Button>{' '}
                    </div>
                </div>
                <AgGridReact
                onRowSelected={this.setSelectFlag}
                onGridReady={ params => this.gridApi = params.api }
                rowSelection="single"
                pagination={true}
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        )
    }
}