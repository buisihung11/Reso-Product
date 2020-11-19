import request from '@/utils/requestServer';

export const createProduct = (prod) => {
  return request.post('/products', {
    data: prod,
  });
};

export const updateProduct = (productId, prod) => {
  return request.post(`/products/${productId}`, {
    data: prod,
  });
};
