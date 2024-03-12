import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { fetchArticle, changeVotesNumber } from "../../api";

const ArticlePage = () => {
  const [getArticle, setGetArticle] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [err, setErr] = useState(null);

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

  const changeVotes = (event) => {
    if (event.target.innerText === "△") {
      setGetArticle((currArticle) => {
        const updatedArticle = { ...currArticle, votes: getArticle.votes + 1 };
        setErr(null);
        return updatedArticle;
      });

      changeVotesNumber(article_id, "increment").catch((err) => {
        setErr("Vote not applied please try again");
      });
    } else if (event.target.innerText === "▽") {
      setGetArticle((currArticle) => {
        const updatedArticle = { ...currArticle, votes: getArticle.votes - 1 };
        setErr(null);
        return updatedArticle;
      });
      changeVotesNumber(article_id, "decrement").catch(() => {
        setErr("Vote not applied please try again");
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{getArticle.title}</h1>
      <img
        src={getArticle.article_img_url}
        alt={getArticle.title}
        className="img"
      />
      <p>{getArticle.body}</p>
      <div className="comment-votes">
        <h3
          onClick={toggleComments}
          className="comment-button"
          style={{ marginRight: "40px" }}
        >
          {showComments ? "Hide Comments↑" : "Show Comments↓"}
        </h3>
        <div className="votes-section">
          <h3 style={{ marginLeft: "40px" }}>Votes: {getArticle.votes}</h3>
          <p
            style={{
              fontSize: "25px",
              color: "green",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={changeVotes}
          >
            △
          </p>
          <p
            style={{
              fontSize: "25px",
              color: "red",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={changeVotes}
          >
            ▽
          </p>
          {err ? <p>{err}</p> : null}
        </div>
      </div>
      {showComments && <Comments article_id={article_id} />}
    </>
  );
};

export default ArticlePage;
