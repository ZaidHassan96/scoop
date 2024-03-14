import React, { useEffect, useState } from "react";
import { fetchTopics } from "../../api";
import { Link } from "react-router-dom";

const Topics = () => {
  const [topics, SetTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((topics) => {
      SetTopics(topics.topics);
    });
  }, []);

  return (
    <div className="topics-menu">
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug} style={{ listStyle: "none" }}>
            <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
