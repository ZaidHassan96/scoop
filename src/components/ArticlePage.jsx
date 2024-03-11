import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticlePage = () => {
  const [getArticle, setGetArticle] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    axios
      .get(`https://news-v9aq.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setGetArticle(response.data.article);
      });
  }, [article_id]);

  return (
    <div>
      <h1>{getArticle.title}</h1>
      <img
        src={getArticle.article_img_url}
        alt={getArticle.title}
        className="img"
      />
      <p>{getArticle.body}</p>
    </div>
  );
};

export default ArticlePage;
