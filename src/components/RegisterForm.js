import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
      contactNumberError: '',
      passwordError: '',
      userType: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });

    if (name === 'contactNumber') {
      this.validateContactNumber(value);
    }

    if (name === 'email') {
      this.validateEmail(value);
    }

    if (name === 'password' || name === 'confirmPassword') {
      this.validatePassword();
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const isContactNumberValid = this.validateContactNumber(
      this.state.contactNumber
    );
    const isPasswordValid = this.validatePassword();

    if (isContactNumberValid && isPasswordValid) {
      axios
        .post('http://localhost:5000/api/signup', {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          address: this.state.address,
          contactNumber: this.state.contactNumber,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          userType: this.state.userType,
        })
        .then((response) => {
          console.log(response.data);
          // handle success response
        })
        .catch((error) => {
          console.log(error.response.data);
          // handle error response
        });

      axios
        .post('http://localhost:5000/api/admin/signup', {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          address: this.state.address,
          contactNumber: this.state.contactNumber,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          userType: this.state.userType,
        })
        .then((response) => {
          console.log(response.data);
          // handle success response
        })
        .catch((error) => {
          console.log(error.response.data);
          // handle error response
        });
    }
  }

  handleUserTypeChange(event) {
    this.setState({
      userType: event.target.value,
    });
  }

  validateContactNumber(contactNumber) {
    const regex = /^\d{10}$/;
    let contactNumberError = '';

    if (!contactNumber) {
      contactNumberError = 'Contact number is required';
    } else if (!regex.test(contactNumber)) {
      contactNumberError = 'Contact number should contain only 10 digits';
    }

    this.setState({ contactNumberError });

    return contactNumberError === '';
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailError = '';

    if (!email) {
      emailError = 'Email is required';
    } else if (!regex.test(email)) {
      emailError = 'Email is invalid';
    }

    this.setState({ emailError });

    return emailError === '';
  }

  validatePassword() {
    const { password, confirmPassword } = this.state;
    let passwordError = '';

    if (!password) {
      passwordError = 'Password is required';
    } else if (password.length < 6) {
      passwordError = 'Password should be at least 6 characters long';
    } else if (confirmPassword && password !== confirmPassword) {
      passwordError = 'Passwords do not match';
    }

    this.setState({ passwordError });

    return passwordError === '';
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          border: '1px solid #ced4da',
          background: '#1c8ef9',
          padding: '20px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1 }}>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
              required
            />
            {this.state.firstName.length === 0 && (
              <div className="invalid-feedback">First name is required</div>
            )}
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
              required
            />
            {this.state.lastName.length === 0 && (
              <div className="invalid-feedback">Last name is required</div>
            )}
          </div>
          {/* Add validation to the other input fields similarly */}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            {this.state.emailError && (
              <div className="invalid-feedback">{this.state.emailError}</div>
            )}
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              name="address"
              value={this.state.address}
              onChange={this.handleInputChange}
              required
            />
            {this.state.address.length === 0 && (
              <div className="invalid-feedback">Address is required</div>
            )}
          </div>
          <div className="mb-3">
            <label>Contact Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter contact number"
              name="contactNumber"
              value={this.state.contactNumber}
              onChange={this.handleInputChange}
              required
            />
            {this.state.contactNumberError && (
              <div className="invalid-feedback">
                {this.state.contactNumberError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            {this.state.passwordError && (
              <div className="invalid-feedback">{this.state.passwordError}</div>
            )}
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered{' '}
            <Link as={Link} to={'/login'}>
              sign in?
            </Link>
          </p>

          <div className="mb-3">
            <label>User type</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                value="admin"
                checked={this.state.userType === 'admin'}
                onChange={this.handleUserTypeChange}
                required
              />
              <label className="form-check-label">Admin</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                value="user"
                checked={this.state.userType === 'user'}
                onChange={this.handleUserTypeChange}
                required
              />
              <label className="form-check-label">User</label>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
