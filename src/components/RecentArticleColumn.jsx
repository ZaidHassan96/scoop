import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import "../../stylesheets/RecentArticleColumn.css";
import { Link } from "react-router-dom";

const RecentArticleColumn = () => {
  const [recentArticles, setRecentArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getArticles = () => {
    setIsLoading(true);
    fetchArticles(undefined, "created_at", "desc", "5").then(
      (articlesFromApi) => {
        setRecentArticles(articlesFromApi);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    getArticles();
  }, []);
  console.log(recentArticles);

  return (
    <div className="recent-articles-container">
      <h1 className="highlight-title">Recent articles</h1>
      {recentArticles.map((article) => (
        <Link to={`/articles/${article.article_id}`} style={{textDecoration: "none", color: "black"}}>
          <div className="article-container" key={article.article_id}>
            <img src={article.article_img_url} alt="" />
            <div className="info">
              <h1>{article.title}</h1>
              <h2>{article.topic}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecentArticleColumn;
