import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getQueueItems,
  updateQueueItems,
  deleteItem
} from "../../actions/queueItemActions";

class QueueItems extends Component {
  constructor(props) {
    super(props);
    this.state = { queue_items: props.queue_items };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.prevQueueItems !== props.queue_items) {
      return {
        queue_items: props.queue_items,
        prevQueueItems: props.queue_items
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.getQueueItems();
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateQueueItems(this.state.queue_items);
  }

  handleChange(id, e) {
    e.preventDefault();
    const updatedScore = parseInt(e.target.value);
    this.setState(state => {
      const newState = state.queue_items.map(item => {
        if (item.id === id) {
          return { ...item, score: updatedScore };
        }
        return item;
      });
      return { queue_items: newState };
    });
  }

  onChange(id, e) {
    e.preventDefault();
    const updatedOrder = parseInt(e.target.value);
    this.setState(state => {
      const newState = state.queue_items.map(item => {
        if (item.id === id) {
          return { ...item, order: updatedOrder };
        }
        return item;
      });
      return { queue_items: newState };
    });
  }

  onDelete(id, e) {
    e.preventDefault();
    this.props.deleteItem(id);
  }

  render() {
    return (
      <section className="my_queue container">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <article>
              <header>
                <h2>My Queue</h2>
              </header>
              <form onSubmit={this.onSubmit}>
                <table className="table">
                  <thead>
                    <tr>
                      <th width="15%">List Order</th>
                      <th width="25%">Video Title</th>
                      <th width="20%">Rating</th>
                      <th width="20%">Genre</th>
                      <th width="20%">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.queue_items.map(item => (
                      <tr key={item.id}>
                        <td>
                          <input
                            className="form-control"
                            value={item.order}
                            onChange={this.onChange.bind(this, item.id)}
                            type="text"
                          />
                        </td>
                        <td>
                          <Link to={`/videos/${item.video_id}`}>
                            {item.video_title}
                          </Link>
                        </td>
                        <td>
                          <select
                            value={item.score || ""}
                            onChange={this.handleChange.bind(this, item.id)}
                            className="form-group"
                          >
                            <option value="5">5 stars</option>
                            <option value="4">4 stars</option>
                            <option value="3">3 stars</option>
                            <option value="2">2 stars</option>
                            <option value="1">1 star</option>
                          </select>
                        </td>
                        <td>{item.video_category}</td>
                        <td>
                          <a data-method="delete" href="#" rel="nofollow">
                            <i
                              className="fa fa-times"
                              onClick={this.onDelete.bind(this, item.id)}
                            />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <input
                  type="submit"
                  value="Update Instant Queue"
                  className="btn btn-primary"
                />
              </form>
            </article>
          </div>
        </div>
      </section>
    );
  }
}

QueueItems.protoType = {
  queue_items: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  queue_items: state.queue_items
});

export default connect(
  mapStateToProps,
  { getQueueItems, updateQueueItems, deleteItem }
)(QueueItems);
