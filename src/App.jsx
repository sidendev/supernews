import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import ArticleSelected from './components/ArticleSelected';
import TopicSelected from './components/TopicSelected';
import ErrorScreen from './error-components/ErrorScreen';
import { themeChange } from 'theme-change';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    themeChange(false);
    const currentTheme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [isDark]);

  return (
    <>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <div className={isDark ? 'dark' : 'light'}></div>
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
