import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getFriendship,
  deleteFriendship
} from "../../actions/friendshipActions";

class Friendship extends Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.props.getFriendship();
  }

  onDelete(id, e) {
    e.preventDefault();
    this.props.deleteFriendship(id);
  }

  render() {
    return (
      <section className="people">
        <header>
          <h2>People I Follow</h2>
        </header>
        <table className="table">
          <thead>
            <tr>
              <th width="30%" />
              <th width="20%">Videos in Queue</th>
              <th width="20%">Followers</th>
              <th width="30%">Unfollow</th>
            </tr>
          </thead>
          <tbody>
            {this.props.followings.map(following => (
              <tr>
                <td>
                  <img src={following.friend_avatar} />
                  <Link to={`/users/${following.friend_id}`}>
                    {following.friend_name}
                  </Link>
                </td>
                <td className="extra-padding">
                  {following.friend_queue_item_count}
                </td>
                <td className="extra-padding">
                  {following.friend_follower_count}
                </td>
                <td className="extra-padding">
                  <i
                    className="fa fa-times"
                    onClick={this.onDelete.bind(this, following.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

Friendship.protoType = {
  followings: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  followings: state.followings
});

export default connect(
  mapStateToProps,
  { getFriendship, deleteFriendship }
)(Friendship);
