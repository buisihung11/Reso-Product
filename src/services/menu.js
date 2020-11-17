import request from '@/utils/requestServer';

export const addProductIntoMenu = (prod, storeId, menuId) => {
  return request.post(`/stores/${storeId}/menus/${menuId}`, {
    data: prod,
  });
};
export const updateProductInMenu = (prod, storeId, menuId) => {
  return request.put(`/stores/${storeId}/menus/${menuId}/products/${prod.product_in_menu_id}`, {
    data: prod,
  });
};

export const addMenuIntoStore = (menu, storeId) => {
  return request.post(`/stores/${storeId}/menus`, {
    data: menu,
  });
};
