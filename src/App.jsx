import { useEffect, useState } from "react";
import "../stylesheets/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import ArticlesList from "./components/ArticlesList";
import ArticlePage from "./components/ArticlePage";
import { UserContext } from "./contexts/User";
import Login from "./components/Login";
import { fetchTopics, fetchUsers } from "../api";
import NotFound from "./components/NotFound";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
// username: "tickle122",
// name: "Tom Tickle",
// avatar_url:
//   "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",

function App() {
  const [err, setErr] = useState(null);
  const [getArticles, setGetArticles] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);

  const [isLoading, setisLoading] = useState(true);
  const [topics, SetTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((allTopics) => {
      SetTopics(allTopics);
    });
  }, []);

  useEffect(() => {
    fetchUsers().then((usersList) => {
      setUsers(usersList);
    });
  }, []);

  if (err) {
    return <h1>{err}</h1>;
  }
  return (
    <UserContext.Provider
      value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser }}
    >
      <div className="head-nav-container">
        <h1 className="header">Scoop</h1>

        <Navigation className="nav" topics={topics} SetTopics={SetTopics} />
      </div>

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <Home
              getArticles={getArticles}
              setGetArticles={setGetArticles}
              err={err}
              setErr={setErr}
              isLoading={isLoading}
              setisLoading={setisLoading}
            />
          }
        />

        <Route path="/login" element={<Login users={users} />} />
        <Route
          path="/articles"
          element={
            <ArticlesList
              getArticles={getArticles}
              setGetArticles={setGetArticles}
              err={err}
              setErr={setErr}
              isLoading={isLoading}
              setisLoading={setisLoading}
            />
          }
        />
        <Route
          path="/articles?topic=:topic"
          element={
            <ArticlesList
              getArticles={getArticles}
              setGetArticles={setGetArticles}
              err={err}
              setErr={setErr}
              isLoading={isLoading}
              setisLoading={setisLoading}
            />
          }
        />
        {/* <Route
          path="/articles/:topic/:article_id"
          element={<ArticlePage users={users} />}
        /> */}
        <Route
          path="/articles/:article_id"
          element={<ArticlePage users={users} err={err} setErr={setErr} />}
        />
        <Route path="/profile/:username" element={<Profile users={users} />} />
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
