import React from "react";
import PropTypes from "prop-types";

const Reviews = ({ reviews }) => {
  return (
    <div>
      <header>
        <h3>User Reviews ({reviews.length})</h3>
      </header>
      <ul>
        {reviews.map(review => (
          <article className="review" key={review.id}>
            <li className="row">
              <div className="col-sm-2">
                <span>Rating: {review.score}</span>
                <p>by {review.user_name}</p>
              </div>
              <div className="col-sm-8">
                <p>{review.content}</p>
              </div>
            </li>
          </article>
        ))}
      </ul>
    </div>
  );
};

Reviews.protoType = {
  reviews: ProtoTypes.array.isRequired
};

export default Reviews;
