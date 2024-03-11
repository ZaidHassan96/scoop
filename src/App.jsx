import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import ArticlesList from "./components/ArticlesList";
import ArticlePage from "./components/ArticlePage";

function App() {
  const [getArticles, setGetArticles] = useState([]);

  return (
    <>
      <h1>Scoop</h1>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/articles"
          element={
            <ArticlesList
              getArticles={getArticles}
              setGetArticles={setGetArticles}
            />
          }
        />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </>
  );
}

export default App;
