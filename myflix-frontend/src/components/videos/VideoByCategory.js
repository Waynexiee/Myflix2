import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const VideoByCategory = ({ category, name }) => {
  return (
    <article className="video_category">
      <header>
        <h3>{name}</h3>
      </header>
      <div className="videos row">
        {category.map(video => (
          <div className="video col-sm-2" key={video.id}>
            <Link to={`/videos/${video.id}`}>
              <img src={`${video.smaller_cover_url}`} alt={video.name} />
            </Link>
          </div>
        ))}
      </div>
    </article>
  );
};

VideoByCategory.propTypes = {
  category: PropTypes.array.isRequired
};

export default VideoByCategory;
