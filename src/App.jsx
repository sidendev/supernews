import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import ArticleSelected from './components/ArticleSelected';
import TopicSelected from './components/TopicSelected';
import ErrorScreen from './error-components/ErrorScreen';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:topic" element={<TopicSelected />} />
        <Route path="/article/:article_id" element={<ArticleSelected />} />
        <Route path="/error/:status" element={<ErrorScreen />} />
        <Route path="*" element={<ErrorScreen status="general" />} />
      </Routes>
    </>
  )
}

export default App
