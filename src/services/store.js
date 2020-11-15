import request from '@/utils/request';

export const getStore = (searchValue) => {
  return request.get(`/menus`, { useCache: true });
};
