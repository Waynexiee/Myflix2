import React, { Component } from "react";
import { getVideo } from "../../actions/videoActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Comment from "../comments/Comment";
class Video extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.getVideo(this.props.match.params.id);
  }

  onClick(e) {
    e.preventDefault();
    this.props.addVideoToQueue(this.props.video.id);
  }

  render() {
    const video = this.props.video;
    return (
      <div>
        <article className="video">
          <div className="container">
            <div className="row">
              <div className="video_large_cover col-sm-7 col-sm-offset-1">
                <video
                  width="665"
                  height="375"
                  src={video.video_url}
                  controls="controls"
                  autobuffer="autobuffer"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="video_info col-sm-3">
                <header>
                  <h3>{video.title}</h3>
                  <span>Rating: {video.average_score} / 5.0</span>
                </header>
                <p>{video.description}</p>
                <div className="action">
                  <input
                    onChange={this.onClick}
                    className="btn btn-primary"
                    value="+ My Queue"
                    type="button"
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
        <Comment video_id={video.id} />
      </div>
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
