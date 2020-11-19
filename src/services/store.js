import request from '@/utils/requestServer';

export const getStore = (searchValue) => {
  return request.get(`/stores`, { useCache: true });
};

export const getCollections = () => {
  return request.get('/collections', { useCache: true });
};
