import React, { Component } from 'react';
import axios from 'axios';  
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination'

import CustomerService from '../shared/customersService';


export default class IndexBootstrap extends Component {

    constructor(props){
        super(props);
        this.customerService = new CustomerService();
        this.state = {
            rowData: [],
            rowSelected : false,
            total: 0,
            currentPage: 1,
            totalPages: 1
        };
    }

    getCustomers(page) {
        axios.get('http://localhost:8080/items/?offset='+page)
          .then(result => {
              this.setState({
                  rowData: result.data.data,
                  total: result.data.total,
                  totalPages: result.data.pages,
                  currentPage: result.data.page + 1 
                })})
    }

    componentDidMount() {
        this.getCustomers(0);
    }

    deleteCustomer(id){
        axios.delete('http://localhost:8080/customers/'+id)
        .then(res =>{this.getCustomers(this.state.currentPage - 1);});
    }

    editCustomer(id){
        this.props.history.push('/edit/'+id)
    }

    goCreate = e => {
        this.props.history.push('/create/')
    }

    changePage = flag => {
        let page = this.state.currentPage - 1;
        switch (flag) {
            case 0:
                page = 0;
                break;
            case 2:
                page= page>0 ? page-1 : page;
                break;
            case 1:
                page= page < this.state.totalPages? page+1 : page;
                break;
            case 9:
                page= this.state.totalPages;
                break;
            default:
                break;
        }
        this.getCustomers(page);
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
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.rowData.map(( listValue ) => {
                        return (
                            <tr key={listValue.id}>
                                <td>{listValue.firstName}</td>
                                <td>{listValue.lastName}</td>
                                <td>{listValue.email}</td>
                                <td>{listValue.phoneNumber}</td>
                                <td>
                                    <Button onClick={() => this.editCustomer(listValue.id)} variant="info">Edit</Button>{' '}
                                    <Button onClick={() => this.deleteCustomer(listValue.id)} variant="danger">Delete</Button>{' '}
                                </td>
                            </tr>
                        );
                        })}
                    </tbody>
                </Table>
                <Pagination>
                    <Pagination.First disabled={this.state.currentPage == 1} onClick={() => this.changePage(0)} />
                    <Pagination.Prev disabled={this.state.currentPage == 1} onClick={() => this.changePage(2)}/>
                    <Pagination.Item active>{this.state.currentPage}</Pagination.Item>
                    <Pagination.Next disabled={this.state.totalPages == this.state.currentPage} onClick={() => this.changePage(1)}/>
                    <Pagination.Last disabled={this.state.totalPages == this.state.currentPage} onClick={() => this.changePage(9)}/>
                </Pagination>
            </div>
        )
    }
}