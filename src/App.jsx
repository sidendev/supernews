import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import ArticleSelected from './ArticleSelected';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:article_id" element={<ArticleSelected />} />
      </Routes>
    </>
  )
}

export default App
