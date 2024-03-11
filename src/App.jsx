import { useState } from "react";
import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import ArticlesList from "./components/ArticlesList";

function App() {
  const [getArticles, setGetArticles] = useState([])
 

  return (
    <>
  <h1>Scoop</h1>
  <Navigation/>
  <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/articles" element={<ArticlesList getArticles={getArticles} setGetArticles={setGetArticles}/>}/>
   

  </Routes>
    </>
  );
}

export default App;
