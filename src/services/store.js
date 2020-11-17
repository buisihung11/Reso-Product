import request from '@/utils/requestServer';

export const getStore = (searchValue) => {
  return request.get(`/stores`, { useCache: true });
};
