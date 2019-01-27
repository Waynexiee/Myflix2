import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Front extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/videos");
    }
  }

  render() {
    return (
      <section className="site_title">
        <h1>
          Unlimited Movies for Only 9.99 a Month.
          <Link to="/register">Sign Up Now!</Link>
        </h1>
        <p className="sign_up" />
        <p className="sign_in">
          Have an account? Please
          <Link to="/sign_in"> Sign In</Link>
        </p>
      </section>
    );
  }
}

Front.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Front);
