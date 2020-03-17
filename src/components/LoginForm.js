import React, { Component } from "react";

export default class LoginForm extends Component {
  render() {
    return (
      <div className="mt-5">
        <p>Log in to get started.</p>
        <form className="" onSubmit={this.props.onSubmit}>
          <div className="form-group col-6 ">
            <label className="col-sm-2">Email</label>
            <input
              type="text"
              name="email"
              onChange={this.props.onChange}
              value={this.props.values.email}
            />
          </div>
          <div className="form-group col-6">
            <label className="col-sm-2">Password</label>
            <input
              type="password"
              name="password"
              onChange={this.props.onChange}
              value={this.props.values.password}
            />
          </div>

          <button type="submit" className="btn btn-dark mr-5">
            Login
          </button>
        </form>
      </div>
    );
  }
}
