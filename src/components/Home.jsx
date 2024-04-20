import React, { useState, useEffect } from "react";
import { fetchArticles } from "../../api";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../stylesheets/Home.css";
import Spinner from "react-bootstrap/Spinner";

const Home = ({
  getArticles,
  setGetArticles,
  err,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  isLoading,
  setisLoading,
}) => {
  const { topic } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setisLoading(true);
    fetchArticles(undefined, "created_at", "desc")
      .then((articles) => {
        setGetArticles(articles);
        setisLoading(false);
        if (topic && articles.some((article) => article.topic === topic)) {
          setErr(null);
        } else if (topic) {
          setErr("Topic not found");
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  }, [setGetArticles, sortBy, sortOrder, topic]);
  console.log(getArticles);

  const top3Articles = getArticles
    .slice()
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

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
      <h1
        style={{ fontFamily: "serif", textAlign: "center", fontSize: "80px" }}
      >
        Welcome to Scoop
      </h1>

      <Row>
        <Col>
          {top3Articles.length > 0 && (
            <Carousel className="carousel">
              <Carousel.Item interval={5000}>
                <img
                  src={top3Articles[0].article_img_url}
                  alt={top3Articles[0].title}
                />
                <Carousel.Caption>
                  <h3>{top3Articles[0].title}</h3>
                  <Link to={`/articles/${top3Articles[0].article_id}`}>
                    <button>Read article</button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={5000}>
                <img
                  src={top3Articles[1].article_img_url}
                  alt={top3Articles[1].title}
                />
                <Carousel.Caption>
                  <h3>{top3Articles[1].title}</h3>
                  <Link to={`/articles/${top3Articles[1].article_id}`}>
                    <button>Read article</button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={5000}>
                <img
                  src={top3Articles[2].article_img_url}
                  alt={top3Articles[2].title}
                />
                <Carousel.Caption>
                  <h3>{top3Articles[2].title}</h3>
                  <Link to={`/articles/${top3Articles[2].article_id}`}>
                    <button>Read article</button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          )}
        </Col>
        <Col className="home-text">
          <h2
            style={{ fontFamily: "serif", textAlign: "center", fontSize: "40px" }}
          >
            Loren Ipsum
          </h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
            lobortis mattis aliquam faucibus purus in. Turpis nunc eget lorem
            dolor sed viverra ipsum nunc aliquet. Dui sapien eget mi proin sed
            libero. Magna sit amet purus gravida quis blandit turpis cursus in.
            Eu lobortis elementum nibh tellus molestie. Duis convallis convallis
            tellus id interdum velit. Pharetra diam sit amet nisl suscipit
            adipiscing bibendum est. Nulla aliquet enim tortor at auctor urna
            nunc. Amet commodo nulla facilisi nullam vehicula ipsum a. Libero
            enim sed faucibus turpis in eu mi. Sit amet nisl purus in. Pharetra
            diam sit amet nisl. Vitae elementum curabitur vitae nunc sed velit
            dignissim. Neque vitae tempus quam pellentesque nec nam aliquam sem.
            Mauris sit amet massa vitae tortor condimentum lacinia quis vel.
          </p>
        </Col>
      </Row>
    </>
  );
};

export default Home;
