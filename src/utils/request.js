/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { getCookie, deleteAllCookie, removeLocalStorage } from './utils';

const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data is successful.',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: 'There was an error in the requested request, and the server did not create or modify data.',
  401: 'The user does not have permission (token, user name, wrong password).',
  403: 'The user is authorized, but access is prohibited.',
  404: 'Not found resource',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Request Error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network anomaly',
    });
  }

  return response;
};

const request = extend({
  // eslint-disable-next-line no-undef
  prefix: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Referer: 'strict-origin-when-cross-origin',
  },
  errorHandler,
});

request.interceptors.request.use((url, options) => {
  const jwtToken = getCookie('APP_TOKEN');
  Object.assign(options.headers, { Authorization: `Bearer ${jwtToken}` });

  return { url, options };
});

request.interceptors.response.use((response, options) => {
  const { status } = response;
  const { method } = options;
  console.log('response', response);
  switch (status) {
    case 200:
      if (method !== 'GET')
        notification.success({
          message: 'Success',
          description: 'Opeartion was success',
        });
      break;
    case 201:
      if (method !== 'GET')
        notification.success({
          message: 'Success',
          description: 'Create was success',
        });
      break;
    case 401:
      notification.error({
        message: 'Unauthorization',
        description: 'Not Logged in. Please Loggin',
      });
      /* eslint-disable no-underscore-dangle */
      deleteAllCookie();
      removeLocalStorage('SYSTEM_ROLE');
      location.href = '/login';
      // setTimeout(() => {
      //   window.g_app._store.dispatch({
      //     type: 'login/logout',
      //   });
      // }, 3000);
      break;
    case 403:
      notification.error({
        message: response.statusText,
        description: `Your request to ${response.url} was forbiden`,
      });
      break;
    case 405:
      notification.error({
        message: response.statusText,
        description: `Please try again`,
      });
      break;
    default:
      break;
  }

  return response;
});

/**
 * 异常处理程序
 */

/**
 * 配置request请求时的默认参数
 */

export default request;
