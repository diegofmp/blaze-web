import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
  
        this.state = {
            firstName: '',
            lastName: '',
            email:'',
            phoneNumber:''
        }
    }
    onChangeFirstName(e) {
      this.setState({
        firstName: e.target.value
      });
    }
    onChangeLastName(e) {
      this.setState({
        lastName: e.target.value
      })  
    }
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      })
    }
    onChangePhoneNumber(e) {
        this.setState({
          phoneNumber: e.target.value
        })
      }
  
    onSubmit(e) {
        e.preventDefault();
        const obj = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber
        };
        axios.post(process.env.REACT_APP_REST_API_LOCATION+'/customers/', obj)
            .then(res => {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber:''
                })
                this.props.history.push('/bootstrap');
            });
      }

    goBack(){
      this.props.history.push('/bootstrap');
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create Customer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name:  </label>
                        <input 
                          required
                          type="text" 
                          className="form-control" 
                          value={this.state.firstName}
                          onChange={this.onChangeFirstName}
                          />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input type="text" 
                          required
                          className="form-control"
                          value={this.state.lastName}
                          onChange={this.onChangeLastName}
                          />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" 
                          required
                          className="form-control"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          />
                    </div>
                    <div className="form-group">
                        <label>Phone: </label>
                        <input type="phone" 
                          required
                          className="form-control"
                          value={this.state.phoneNumber}
                          onChange={this.onChangePhoneNumber}
                          />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Save" className="btn btn-primary"/>
                        <a style={{marginLeft: '10px'}} className="btn btn-secondary" href="/bootstrap">Cancel<span className="sr-only"></span></a>
                    </div>
                </form>
            </div>
        )
    }
}