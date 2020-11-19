import request from '@/utils/requestServer';

export const createArticle = (storeId, data) => {
  return request.post(`/stores/${storeId}/articles`, {
    data,
  });
};

export const changeArticleType = (storeId, articleType) => {
  return request.put(`/stores/${storeId}/articles/switch`, {
    params: {
      articleType,
    },
  });
};
