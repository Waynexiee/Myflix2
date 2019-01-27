import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
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
    this.props.loginUser(this.state, this.props.history);
  }

  render() {
    return (
      <section className="sign_in container">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <form className="sign-in" onSubmit={this.onSubmit}>
              <header>
                <h1>Sign In</h1>
              </header>
              <fieldset>
                <div className="form-group">
                  <label htmlFor="session_email">Email Address</label>
                  <div className="row">
                    <div className="col-sm-4">
                      <input
                        type="email"
                        className="form-control"
                        value={this.state.email}
                        name="email"
                        id="session_email"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <div className="row">
                    <div className="col-sm-4">
                      <input
                        type="password"
                        className="form-control"
                        value={this.state.password}
                        name="password"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className="form-group action">
                <input
                  value="Sign In"
                  type="submit"
                  className="btn btn-primary"
                />
                <Link to="/new_password_reset_path" className="btn btn-default">
                  Forget Password
                </Link>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
