import request from '@/utils/requestServer';

export const createProduct = (prod) => {
  return request.post('/products', {
    data: prod,
  });
};
