import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { fetchArticle } from "../../api";

const ArticlePage = () => {
  const [getArticle, setGetArticle] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    setisLoading(true);
    fetchArticle(article_id).then((article) => {
      setGetArticle(article);
      setisLoading(false);
    });
  }, [article_id]);

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{getArticle.title}</h1>
      <img
        src={getArticle.article_img_url}
        alt={getArticle.title}
        className="img"
      />
      <p>{getArticle.body}</p>
      <h3 onClick={toggleComments} className="comment-button">
        {showComments ? "Hide Comments↑" : "Show Comments↓"}
      </h3>
      {showComments && <Comments article_id={article_id} />}
    </div>
  );
};

export default ArticlePage;
