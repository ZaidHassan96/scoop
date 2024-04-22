import React, { useEffect, useState } from "react";
import { fetchTopics } from "../../api";
import { Link } from "react-router-dom";
import "../../stylesheets/Topics.css"

const Topics = ({ topics, SetTopics }) => {
  // Check if topics is defined and has the necessary structure
  const topicsArr = topics && topics.topics && topics.topics.topics;

  return (
    <div className="topics-menu">
      <ul>
        <li>
          <Link to="/articles" className="topic">
            All
          </Link>
        </li>
        {topicsArr &&
          topicsArr.map((topic) => (
            <li key={topic.slug}>
              <Link to={`/articles?topic=${topic.slug}`} className="topic">
                {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Topics;
