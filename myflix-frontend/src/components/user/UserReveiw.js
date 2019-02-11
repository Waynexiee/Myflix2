import React from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const UserReview = props => {
  const { user } = props;
  return (
    <section className="user_reviews container">
      <div className="row">
        <div className="col-sm-10 col-sm-offset-1">
          <header>
            <h3>{`${user.name}'s Reviews (${
              (user.all_reviews || []).length
            })`}</h3>
          </header>
          <ul>
            {(user.all_reviews || []).map(review => (
              <article key={review.id} className="review">
                <li className="row">
                  <div className="col-sm-2">
                    <p>
                      <Link to={`/videos/${review.video_id}`}>
                        {review.video_name}
                      </Link>
                    </p>
                    Rating: {review.score} / 5
                  </div>
                  <div className="col-sm-8">
                    <p>{review.content}</p>
                  </div>
                </li>
              </article>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

UserReview.protoType = {
  user: PropTypes.object.isRequired
};

export default UserReview;
