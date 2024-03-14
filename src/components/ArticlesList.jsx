import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../../api";

const ArticlesList = ({ getArticles, setGetArticles }) => {
  const [isLoading, setisLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    setisLoading(true);
    fetchArticles().then((articles) => {
      setGetArticles(articles);
      setisLoading(false);
    });
  }, [setGetArticles]);

  const makeListItems = (articles) => {
    if (!articles) {
      return <h2>No Articles</h2>;
    } else if (!topic) {
      return articles.map((article) => (
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
      const topicArticles = articles.filter(
        (article) => article.topic === topic
      );
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
          <Link to={`/articles/${article.article_id}`}>
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
      <ul className="articles-list">{makeListItems(getArticles)}</ul>
    </div>
  );
};

export default ArticlesList;
