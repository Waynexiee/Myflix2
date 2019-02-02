import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchResults = ({ videos }) => {
  return (
    <div>
      <h2 className="results_count">
        Results: {videos.length || 0} videos found
      </h2>
      {videos.map(video => (
        <article className="video row" key={video.id}>
          <div className="video_data">
            <figure className="col-sm-2">
              <Link to={`/videos/${video.id}`}>
                <img src={video.smaller_cover_url} alt={video.title} />
              </Link>
            </figure>
            <div className="video_body col-sm-10">
              <header>
                <h3>
                  Video:
                  <em className="label label-highlight"> {video.title}</em>
                </h3>
              </header>
              <p className="video_description">{video.description}</p>
              <hr />
              <div className="details">
                <span className="average_rating">{video.average_score}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

SearchResults.protoType = {
  videos: PropTypes.array.isRequired
};

export default SearchResults;
