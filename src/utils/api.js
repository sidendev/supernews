import axios from 'axios';

export const newsApi = axios.create({
  baseURL: 'https://supernews-4j74.onrender.com/api',
});

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res;
  });
};

export const getArticles = (sortByInput, orderByInput) => {
  return newsApi
    .get('/articles/', {
      params: {
        sort_by: sortByInput,
        order: orderByInput,
      },
    })
    .then((res) => {
      return res;
    });
};

export const getAllComments = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res;
  });
};

export const addArticleVote = (article_id) => {
  axios({
    method: 'patch',
    url: `https://supernews-4j74.onrender.com/api/articles/${article_id}`,
    data: {
      inc_votes: 1,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const removeArticleVote = (article_id) => {
  axios({
    method: 'patch',
    url: `https://supernews-4j74.onrender.com/api/articles/${article_id}`,
    data: {
      inc_votes: -1,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const postNewComment = (article_id, commentAuthor, commentBody) => {
  axios
    .post(
      `https://supernews-4j74.onrender.com/api/articles/${article_id}/comments`,
      {
        author: commentAuthor,
        body: commentBody,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteComment = (comment_id) => {
  axios
    .delete(`https://supernews-4j74.onrender.com/api/comments/${comment_id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getArticlesByTopic = (topic) => {
  return axios
    .get('https://supernews-4j74.onrender.com/api/articles/', {
      params: {
        topic: topic,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
