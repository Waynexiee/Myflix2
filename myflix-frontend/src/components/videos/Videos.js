import React, { Component } from "react";
import VideoByCategory from "./VideoByCategory";
import { getVideos } from "../../actions/videoActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Videos extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getVideos();
    } else {
      this.props.history.push("/sign_in");
    }
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        {Object.keys(categories).map(key => (
          <VideoByCategory key={key} category={categories[key]} name={key} />
        ))}
      </div>
    );
  }
}

Videos.protoType = {
  categories: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories.categories,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getVideos }
)(withRouter(Videos));
