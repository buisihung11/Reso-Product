import requestServer from '@/utils/requestServer';

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export const getTableData2 = (resource, options) => {
  // return {
  //   total: data.length,
  //   list: data,
  // };
  return requestServer.get(`/${resource}`, options).then((res) => ({
    total: res.metadata.total,
    list: res.data,
  }));
};

export const getTableData = (resource, options) => {
  // return {
  //   total: data.length,
  //   list: data,
  // };
  return requestServer.get(`/${resource}`, options).then((res) => ({
    total: res.length,
    list: res,
  }));
};
