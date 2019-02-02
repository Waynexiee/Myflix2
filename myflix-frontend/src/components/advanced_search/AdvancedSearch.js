import React, { Component } from "react";
import SearchResults from "./SearchResults";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { advanced_search } from "../../actions/videoActions";

class AdvancedSearch extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.advanced_search(this.state.value);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <section className="advanced_search container">
        <form className="form-horizontal" onSubmit={this.onSubmit}>
          <header>
            <h1>
              Advanced Search(Now only support local environment because it
              costs a lot on heroku.)
            </h1>
          </header>
          <div className="form-group">
            <div className="col-sm-6">
              <input
                placeholder="Search videos by title, description"
                className="form-control"
                value={this.state.value}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6">
              <button type="submit" className="btn btn-primary">
                <span className="glyphicon glyphicon-search" />
                Search
              </button>
            </div>
          </div>
        </form>
        <hr />
        <SearchResults videos={this.props.videos} />
      </section>
    );
  }
}

AdvancedSearch.propTypes = {
  advanced_search: PropTypes.func.isRequired,
  videos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  videos: state.categories.videos
});

export default connect(
  mapStateToProps,
  { advanced_search }
)(AdvancedSearch);
