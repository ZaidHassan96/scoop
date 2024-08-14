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
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";

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

  useEffect(() => {
    // Check if there's a logged-in user stored in localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      // If there is, set it as the loggedInUser
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, [setLoggedInUser]);

  return (
    <UserContext.Provider
      value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser }}
    >
      <div className="head-nav-container">
        <h1 className="header">Scoop</h1>

        <Navigation className="nav" topics={topics} SetTopics={SetTopics} />
      </div>

      <Routes>
        <Route
          path="*"
          element={<ErrorPage errMsg={"Error 404: page not found"} />}
        />
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

        <Route
          path="/articles/:article_id"
          element={<ArticlePage users={users} err={err} setErr={setErr} />}
        />
        <Route
          path="/profile/:username"
          element={
            <Profile
              users={users}
              err={err}
              setErr={setErr}
              isLoading={isLoading}
              setisLoading={setisLoading}
            />
          }
        />
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
