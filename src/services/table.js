import request from '@/utils/request';

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export const getTableData = (resource, options) => {
  // return {
  //   total: data.length,
  //   list: data,
  // };
  return request.get(`/${resource}`, options).then((res) => ({
    total: res.length,
    list: res,
  }));
};
