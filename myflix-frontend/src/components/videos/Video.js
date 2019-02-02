import React, { Component } from "react";
import { getVideo } from "../../actions/videoActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Video extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.getVideo(this.props.video.id);
  }

  onClick(e) {
    e.preventDefault();
    this.props.addVideoToQueue(this.props.video.id);
  }

  render() {
    const video = this.props.video;
    return (
      <article className="video">
        <div className="container">
          <div className="row">
            <div className="video_large_cover col-sm-7 col-sm-offset-1">
              <img src={video.larger_cover_url} />
            </div>
            <div className="video_info col-sm-3">
              <header>
                <h3>{video.title}</h3>
                <span>Rating: {video.average_score} / 5.0</span>
              </header>
              <p>{video.description}</p>
              <div className="action">
                <Link
                  to={`/watch_video/${video.url}`}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Watch Now
                </Link>
                <input
                  onClick={this.onClick}
                  className="btn btn-primary"
                  value="+ My Queue"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

Video.protoType = {
  video: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  video: state.categories.video
});

export default connect(
  mapStateToProps,
  { getVideo }
)(Video);
