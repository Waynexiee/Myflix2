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
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
  }

  render() {
    return (
      <section className="reviews container">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <form>
              <fieldset>
                <div className="form-group">
                  <label>Rate This Video</label>
                  <div className="row">
                    <div className="col-sm-3">
                      <select
                        value={this.state.value}
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
                  <lable>Write Review</lable>
                  <div className="row">
                    <div className="col-sm-8">
                      <textarea rows="6" className="form-control" />
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
