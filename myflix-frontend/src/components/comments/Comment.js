import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import { addComment } from "../../actions/commentActions";

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      score: "1"
    };

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ score: e.target.value });
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addComment(this.props.video_id, this.state);
    this.setState({ content: "" });
    this.setState({ score: "1" });
  }

  render() {
    return (
      <section className="reviews container">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <form onSubmit={this.onSubmit}>
              <fieldset>
                <div className="form-group">
                  <label>Rate This Video</label>
                  <div className="row">
                    <div className="col-sm-3">
                      <select
                        value={this.state.score}
                        onChange={this.handleChange}
                      >
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Write Review</label>
                  <div className="row">
                    <div className="col-sm-8">
                      <textarea
                        rows="6"
                        className="form-control"
                        onChange={this.onChange}
                        value={this.state.content}
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className="form-group actions clearfix">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
                <Link to={`/video/${this.props.video_id}`}>Cancel</Link>
              </fieldset>
            </form>
            <Reviews reviews={this.props.reviews || []} />
          </div>
        </div>
      </section>
    );
  }
}

Comment.protoType = {
  reviews: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  reviews: state.categories.video.reviews
});

export default connect(
  mapStateToProps,
  { addComment }
)(Comment);
