import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { fetchArticle, changeVotesNumber, postComment } from "../../api";

const ArticlePage = ({ users }) => {
  console.log("im in article page");
  const [getArticle, setGetArticle] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [commentInput, setCommentInput] = useState({
    username: "",
    body: "",
  });
  const [comments, setComments] = useState([]);
  // const [users, setUsers] = useState([]);

  const { article_id } = useParams();

  const userNameList = users.map((user) => user.username);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentInput.username || !commentInput.body) {
      return;
    }

    const temporaryComment = {
      author: commentInput.username,
      body: commentInput.body,
      created_at: new Date().toISOString(),
      comment_id: `temp_${Math.floor(Math.random() * 1000000)}`,
    };
    setComments((currComments) => {
      return [temporaryComment, ...currComments];
    });

    setErr(null);

    postComment(commentInput, article_id).catch((err) => {
      if (!userNameList.includes(temporaryComment.author)) {
        setErr("Sorry the user for the provided username does not exist");
        setShowComments(false);
      } else if (err) {
        setErr("Comment failed to post, please try again.");
        setComments((prevComments) =>
          prevComments.filter(
            (comment) => comment.comment_id !== temporaryComment.comment_id
          )
        );
      }
    });
    setShowComments(true);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCommentInput((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
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
        <form className="comment-button" onSubmit={handleSubmit}>
          <p>Add Comment</p>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={commentInput.username}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="comment"></label>
          <input
            type="text"
            id="body"
            placeholder="comment"
            value={commentInput.body}
            onChange={handleChange}
          />
          <br />
          <button
            type="submit"
            disabled={!commentInput.username || !commentInput.body || isLoading}
          >
            {isLoading ? "Posting..." : "Post Comment"}
          </button>
        </form>

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
        </div>
      </div>
      {err ? <p style={{ color: "red" }}>{err}</p> : null}
      <h3
        onClick={toggleComments}
        className="comment-button"
        style={{ marginRight: "40px" }}
      >
        {showComments ? "Hide Comments↑" : "Show Comments↓"}
      </h3>

      {showComments && (
        <Comments
          article_id={article_id}
          comments={comments}
          setComments={setComments}
          showComments={showComments}
          setShowComments={setShowComments}
          err={err}
          setErr={setErr}
        />
      )}
    </>
  );
};

export default ArticlePage;
