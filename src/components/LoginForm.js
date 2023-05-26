import React, { Component } from 'react'
export default class LoginForm extends Component {
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
        }}
      >
        <h3><center>Login</center></h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
}