import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addFriendship } from "../../actions/friendshipActions";
import { getUser } from "../../actions/userActions";
import UserReview from "./UserReveiw";

class User extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  onClick(id, e) {
    e.preventDefault();
    this.props.addFriendship(id);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <section className="user container">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
              <article>
                <header>
                  <img src={user.avatar} />
                  <h2>
                    {`${user.name}'s video collections(${
                      (user.queue_items || []).length
                    })`}
                  </h2>
                  {user.can_follow && (
                    <input
                      onClick={this.onClick.bind(this, user.id)}
                      className="btn btn-primary float-right"
                      value="Follow"
                    />
                  )}
                </header>
                <table className="table">
                  <thead>
                    <tr>
                      <th width="30%">Video Title</th>
                      <th width="15%">Genre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(user.all_queue_items || []).map(item => (
                      <tr key={item.id}>
                        <td>
                          <Link to={`/videos/${item.video_id}`}>
                            {item.video_name}
                          </Link>
                        </td>
                        <td>{item.video_category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </div>
          </div>
        </section>
        <UserReview user={user} />
      </div>
    );
  }
}

User.protoType = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { addFriendship, getUser }
)(User);
