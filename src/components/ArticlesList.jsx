import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchArticles } from "../../api";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import "../../stylesheets/ArticlesList.css";
import { Spinner } from "react-bootstrap";
import ErrorPage from "./ErrorPage";

const ArticlesList = ({ err, setErr, isLoading, setisLoading }) => {
  const [getArticles, setGetArticles] = useState([]);
  const [sortBy, SetSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  useEffect(() => {
    setisLoading(true);
    fetchArticles(undefined, sortBy, sortOrder)
      .then((articles) => {
        setGetArticles(articles);
        setisLoading(false);
        let queryStr = `&sort_by=${sortBy}&order=${sortOrder}`;
        setSearchParams(queryStr);
        if (topic && articles.some((article) => article.topic === topic)) {
          let queryStr = `topic=${topic}&sort_by=${sortBy}&order=${sortOrder}`;
          setSearchParams(queryStr);
          setErr(null);
        } else if (topic) {
          setErr("Topic not found");
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  }, [setGetArticles, sortBy, sortOrder, topic]);

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
    } else if (topic === null) {
      return (
        <div>
          {getArticles.map(
            (article, index) =>
              index % 5 === 0 && ( // Check if index is a multiple of 5
                <div key={`group_${index / 4}`} className="article-group">
                  {getArticles
                    .slice(index, index + 4)
                    .map((groupedArticle, innerIndex) => (
                      <Link
                        to={`/articles/${groupedArticle.article_id}`}
                        className={`card`}
                        key={groupedArticle.article_id}
                      >
                        <img
                          src={groupedArticle.article_img_url}
                          alt={`Image of ${groupedArticle.title}`}
                          className="img"
                        />
                        <h2>{groupedArticle.title}</h2>

                        <div className="votes-comments-icon">
                          <p style={{ marginRight: "10px" }}>
                            <ThumbUpOutlinedIcon />
                            {groupedArticle.votes}
                          </p>
                          <p style={{ marginLeft: "10px" }}>
                            <ModeCommentOutlinedIcon />
                            {groupedArticle.comment_count}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              )
          )}
        </div>
      );
    } else {
      const topicArticles = getArticles.filter(
        (article) => article.topic === topic
      );

      return (
        <div>
          {topicArticles.map(
            (article, index) =>
              index % 5 === 0 && ( // Check if index is a multiple of 5
                <div key={`group_${index / 4}`} className="article-group">
                  {topicArticles
                    .slice(index, index + 4)
                    .map((groupedArticle, innerIndex) => (
                      <Link
                        to={`/articles/${groupedArticle.article_id}`}
                        className={`card`}
                        key={groupedArticle.article_id}
                      >
                        <img
                          src={groupedArticle.article_img_url}
                          alt={`Image of ${groupedArticle.title}`}
                          className="img"
                        />
                        <h2>{groupedArticle.title}</h2>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "10px",
                          }}
                        >
                          <p style={{ marginRight: "10px" }}>
                            <ThumbUpOutlinedIcon />
                            {groupedArticle.votes}
                          </p>
                          <p style={{ marginLeft: "10px" }}>
                            <ModeCommentOutlinedIcon />
                            {groupedArticle.comment_count}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              )
          )}
        </div>
      );
    }
  };

  if (err) {
    return <ErrorPage errMsg={err} />;
  }

  if (isLoading) {
    return (
      <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="articles-container">
      <label style={{ marginRight: 5, marginLeft: 5 }} htmlFor="sortBy">
        Sort By:
      </label>
      <select id="sortBy" value={sortBy} onChange={handleSortChange}>
        <option value="created_at">Date</option>

        <option value="votes">Votes</option>
      </select>
      <label style={{ marginLeft: 10, marginRight: 5 }} htmlFor="sortOrder">
        Sort Order:
      </label>
      <select id="sortOrder" value={sortOrder} onChange={handleOrderChange}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <ul className="articles-list">{makeListItems(getArticles)}</ul>
    </div>
  );
};

export default ArticlesList;
