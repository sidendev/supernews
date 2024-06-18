import axios from 'axios';

export const newsApi = axios.create({
  baseURL: 'https://supernews-4j74.onrender.com/api',
});

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res;
  });
};

export const getArticles = () => {
  return newsApi.get('/articles/').then((res) => {
    return res;
  });
};
