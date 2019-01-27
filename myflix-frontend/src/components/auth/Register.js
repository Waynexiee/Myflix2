import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.registerUser(this.state, this.props.history);
  }

  render() {
    return (
      <section className="register container">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <form className="form-horizontal" onSubmit={this.onSubmit}>
              <header>
                <h1>Register</h1>
              </header>
              <fieldset>
                <div className="form-group">
                  <label className="control-label col-sm-2">
                    Email Address
                  </label>
                  <div className="col-sm-6">
                    <input
                      value={this.state.email}
                      onChange={this.onChange}
                      className="form-control"
                      type="email"
                      name="email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">Password</label>
                  <div className="col-sm-6">
                    <input
                      value={this.state.password}
                      onChange={this.onChange}
                      className="form-control"
                      type="password"
                      name="password"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">Full Name</label>
                  <div className="col-sm-6">
                    <input
                      value={this.state.name}
                      onChange={this.onChange}
                      className="form-control"
                      type="text"
                      name="name"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="actions control-group col-sm-offset-2">
                <div className="controls">
                  <input
                    type="submit"
                    value="Sign Up"
                    className="btn btn-primary"
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
