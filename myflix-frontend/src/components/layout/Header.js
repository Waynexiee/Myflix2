import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.searchVideos(this.state.value);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const navBar = (
      <ul className="col-md-5 clearfix" key="navbar">
        <li key="video">
          <Link to="/videos">VIDEOS</Link>
        </li>
        <li key="queue">
          <Link to="/my_queue">MY QUEUE</Link>
        </li>
        <li key="people">
          <Link to="/friendship">PEOPLE</Link>
        </li>
        <li key="advanced_search">
          <Link to="/advanced_search_videos_path">ADVANCED SEARCH</Link>
        </li>
      </ul>
    );

    const searchForm = (
      <form
        className="col-md-3 navbar-form"
        onSubmit={this.onSubmit}
        key="searchForm"
      >
        <div>
          <input
            className="form-control"
            placeholder="Search for videos here"
            type="text"
            value={this.state.value}
            onChange={this.onChange}
          />
        </div>
        <input type="submit" className="btn btn-light" value="Search" />
      </form>
    );

    const dropDown = (
      <div className="pullright" id="user_links" key="dropDown">
        <ul>
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              data-target="#"
              data-toggle="dropdown"
              href="#"
              id="dlabel"
              role="button"
            >
              Welcome,{user.name}
              <b className="caret" />
            </a>
            <ul aria-labelledby="dlabel" className="dropdown-menu" role="menu">
              <li>
                <Link to="/user">Account</Link>
                <a />
                <a data-method="delete" rel="nofollow" onClick={this.onClick}>
                  Sign Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );

    return (
      <div>
        <section id="top-header" className="row">
          <h1 className="col-md-2">
            <Link to="/videos">MyFLiX</Link>
          </h1>
          {isAuthenticated ? [navBar, searchForm, dropDown] : ""}
        </section>
      </div>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Header));
