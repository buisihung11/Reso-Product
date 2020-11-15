import request from '@/utils/requestServer';

export async function getCategories(brand_id) {
  return request.get(`/categories`, {
    brand_id,
    useCache: true,
  });
}
