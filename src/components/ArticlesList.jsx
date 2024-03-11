import React, { useEffect } from "react";
import axios from "axios";

const ArticlesList = ({ getArticles, setGetArticles }) => {
  useEffect(() => {
    axios
      .get("https://news-v9aq.onrender.com/api/articles")
      .then((response) => {
        console.log(response.data.articles);
        setGetArticles(response.data.articles);
      });
  }, [setGetArticles]);

  const makeListItems = (articles) => {
    if (!articles) {
      return <h2>No Articles</h2>;
    } else {
      return articles.map((article) => (
        <li key={article.article_id} className="card">
          <h2>{article.title}</h2>

          <img
            src={article.article_img_url}
            alt={`Image off ${article.title}`}
            className="img"
          />
          <h3>{new Date(article.created_at).toLocaleDateString()}</h3>
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
