import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../../api";

const ArticlesList = ({ getArticles, setGetArticles }) => {
  const [isLoading, setisLoading] = useState(true);
  const [sortBy, SetSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const { topic } = useParams();

  useEffect(() => {
    setisLoading(true);
    fetchArticles({ sortBy, sortOrder }).then((articles) => {
      console.log(sortBy);
      setGetArticles(articles);
      setisLoading(false);
    });
  }, [setGetArticles, sortBy, sortOrder]);

  const handleSortChange = (event) => {
    const { value } = event.target;
    SetSortBy(value);
  };

  const handleOrderChange = (event) => {
    const { value } = event.target;
    setSortOrder(value);
  };

  const makeListItems = (getArticles) => {
    if (!getArticles) {
      return <h2>No Articles</h2>;
    } else if (topic === undefined) {
      return getArticles.map((article) => (
        <li className="card" key={article.article_id}>
          <div>
            <h2>{article.title}</h2>
            <img
              src={article.article_img_url}
              alt={`Image off ${article.title}`}
              className="img"
            />
            <h3>{new Date(article.created_at).toUTCString()}</h3>
          </div>
          <Link to={`/articles/${article.article_id}`}>
            <p>Click to read ⏎</p>
          </Link>
        </li>
      ));
    } else {
      const topicArticles = getArticles.filter(
        (article) => article.topic === topic
      );
      // console.log(topicArticles);
      return topicArticles.map((article) => (
        <li className="card" key={article.article_id}>
          <div>
            <h2>{article.title}</h2>
            <img
              src={article.article_img_url}
              alt={`Image off ${article.title}`}
              className="img"
            />
            <h3>{new Date(article.created_at).toUTCString()}</h3>
          </div>
          <Link to={`/articles/${topic}/${article.article_id}`}>
            <p>Click to read ⏎</p>
          </Link>
        </li>
      ));
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{topic}</h1>
      <label htmlFor="sortBy">Sort By:</label>
      <select id="sortBy" value={sortBy} onChange={handleSortChange}>
        <option value="">Choose option</option>
        <option value="created_at">Date</option>
        {/* <option value="commentCount">Comment Count</option> */}
        <option value="votes">Votes</option>
      </select>
      <label htmlFor="sortOrder">Sort Order:</label>
      <select id="sortOrder" value={sortOrder} onChange={handleOrderChange}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <ul className="articles-list">{makeListItems(getArticles)}</ul>
    </div>
  );
};

export default ArticlesList;
