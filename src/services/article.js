import request from '@/utils/requestServer';

export const createArticle = (storeId, data) => {
  return request.post(`/stores/${storeId}/articles`, {
    data,
  });
};
