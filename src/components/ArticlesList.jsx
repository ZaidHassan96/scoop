import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ArticlesList = ({ getArticles, setGetArticles }) => {
  useEffect(() => {
    axios
      .get("https://news-v9aq.onrender.com/api/articles")
      .then((response) => {
        setGetArticles(response.data.articles);
      });
  }, [setGetArticles]);

  const makeListItems = (articles) => {
    if (!articles) {
      return <h2>No Articles</h2>;
    } else {
      return articles.map((article) => (
        <li className="card" key={article.article_id}>
          <Link to={`/articles/${article.article_id}`}>
            <div>
              <h2>{article.title}</h2>
              <img
                src={article.article_img_url}
                alt={`Image off ${article.title}`}
                className="img"
              />
              <h3>{new Date(article.created_at).toLocaleDateString()}</h3>
            </div>
          </Link>
        </li>
      ));
    }
  };

  return (
    <div>
      <h1>Articles</h1>
      <ul className="articles-list">{makeListItems(getArticles)}</ul>
    </div>
  );
};

export default ArticlesList;
