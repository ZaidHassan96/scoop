import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { UserContext } from "../contexts/User";
import { fetchArticle, changeVotesNumber, postComment } from "../../api";
import RecentArticleColumn from "./RecentArticleColumn";
import "../../stylesheets/ArticlePage.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { Spinner } from "react-bootstrap";

const ArticlePage = ({ users, err, setErr }) => {
  const [getArticle, setGetArticle] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [errArticle, setErrArticle] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [voteButtonClicked, setVoteButtonClicked] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  // const [users, setUsers] = useState([]);

  const { article_id } = useParams();

  const userNameList = users.map((user) => user.username);
  useEffect(() => {
    setisLoading(true);
    fetchArticle(article_id)
      .then((article) => {
        setGetArticle(article);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setErr("Article does not exist");
        setisLoading(false);
      });
    setErr(null);
  }, [article_id]);

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };
  const handlePostCommentClick = () => {
    document.getElementById("comment-form").scrollIntoView();
  };

  // const changeVotes = (event) => {
  //   if (event.target.innerText === "△") {
  //     setGetArticle((currArticle) => {
  //       const updatedArticle = { ...currArticle, votes: getArticle.votes + 1 };
  //       setErrArticle(null);
  //       return updatedArticle;
  //     });

  //     changeVotesNumber(article_id, "increment").catch((err) => {
  //       setErrArticle("Vote not applied please try again");
  //     });
  //   } else if (event.target.innerText === "▽") {
  //     setGetArticle((currArticle) => {
  //       const updatedArticle = { ...currArticle, votes: getArticle.votes - 1 };
  //       setErrArticle(null);
  //       return updatedArticle;
  //     });
  //     changeVotesNumber(article_id, "decrement").catch(() => {
  //       setErrArticle("Vote not applied please try again");
  //     });
  //   }
  // };

  const changeVote = (event) => {
    if (!loggedInUser) {
      alert("You must be logged in to comment");
      return;
    }
    if (!voteButtonClicked) {
      setGetArticle((currArticle) => {
        const updatedArticle = { ...currArticle, votes: getArticle.votes + 1 };
        setErrArticle(null);
        return updatedArticle;
      });
      changeVotesNumber(article_id, "increment").catch((err) => {
        setErrArticle("Vote not applied please try again");
      });
      setVoteButtonClicked(true);
      return;
    } else if (voteButtonClicked === true) {
      setGetArticle((currArticle) => {
        const updatedArticle = { ...currArticle, votes: getArticle.votes - 1 };
        setErrArticle(null);
        return updatedArticle;
      });
      changeVotesNumber(article_id, "decrement").catch(() => {
        setErrArticle("Vote not applied please try again");
      });
      setVoteButtonClicked(false);
      return;
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="page">
        <div className="article-main">
          <div className="article">
            <h1
              style={{
                marginBottom: "10px",
                marginTop: "10px",
                fontFamily: "serif",
              }}
            >
              {getArticle.title}
            </h1>
            <h4
              style={{
                marginBottom: "10px",
                marginTop: "10px",
                fontStyle: "italic",
              }}
            >
              By {getArticle.author}
            </h4>
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              Posted {getArticle.created_at.slice(0, 10)}
            </p>

            {/* <div className="votes-section">
              <p style={{ fontSize: "20px", marginRight: "10px" }}>Vote: </p>
              <button
                style={{
                  fontSize: "25px",
                  color: "black",
                  cursor: "pointer",
                  userSelect: "none",
                  borderRadius: "10px",
                  marginRight: "5px",
                  width: "40px",
                }}
                onClick={changeVotes}
              >
                △
              </button>

              <button
                style={{
                  fontSize: "25px",
                  color: "black",
                  cursor: "pointer",
                  userSelect: "none",
                  borderRadius: "10px",
                  marginLeft: "5px",
                  width: "40px",
                }}
                onClick={changeVotes}
              >
                ▽
              </button>
            </div> */}
            <div className="image-article">
              <img
                src={getArticle.article_img_url}
                alt={getArticle.title}
                className="img"
              />
              <div style={{ marginLeft: "15px", display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ThumbUpOffAltIcon
                    style={{
                      fontSize: "40px",
                      color: voteButtonClicked ? "green" : "inherit",
                      transition: "color 0.3s ease",
                      cursor: "pointer",
                      ":hover": {
                        color: "green",
                      },
                    }}
                    onClick={changeVote}
                  />

                  <p>{getArticle.votes}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  
                  <ModeCommentOutlinedIcon
                    style={{
                      fontSize: "35px",
                      marginLeft: "10px",
                      marginTop: "5px",
                    }}
                    onClick={toggleComments}
                  />
                  <p>{getArticle.comment_count}</p>
                </div>
              </div>

              <p className="article-body">{getArticle.body}</p>
            </div>

            <p onClick={toggleComments} className="comment-toggle">
              {showComments ? "Hide Comments..." : "View Comments..."}
            </p>
          </div>

          {showComments && (
            <div className="comments">
              {/* <h2 onClick={handlePostCommentClick} className="post-comment">
            Post comment
          </h2> */}
              <Comments
                article_id={article_id}
                comments={comments}
                setComments={setComments}
                showComments={showComments}
                setShowComments={setShowComments}
                errArticle={errArticle}
                setErrArticle={setErrArticle}
                commentInput={commentInput}
                setCommentInput={setCommentInput}
                users={users}
              />
            </div>
          )}
        </div>
        <div className="recent-article-column">
          <RecentArticleColumn />
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
