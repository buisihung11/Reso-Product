import { parse } from 'querystring';
import moment from 'moment';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

// Custom utils

export const buildParams = ({ current, pageSize }, sorter, formData) => {
  // build filters
  const filters = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      filters[`${key}_contains`] = value;
    }
  });
  // build sort
  let sort;
  if (sorter && sorter.field) {
    sort = `${sorter.field},${sorter.order === 'ascend' ? 'ascend' : 'descend'}`;
  }

  return {
    page: current,
    size: pageSize,
    sort,
    ...filters,
  };
};

// get Cookie
export const setCookie = (cname, cvalue, expireDay = 10) => {
  const d = new Date();
  d.setTime(d.getTime() + expireDay * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export const getCurrentStore = () => localStorage.getItem('CURRENT_STORE');

// set Cookie
export const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
// delete all cookies
export const deleteAllCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

// set localstorage
export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

// get localstorage
export const getLocalStorage = (name) => localStorage.getItem(name);
//
export const removeLocalStorage = (key) => localStorage.removeItem(key);

export const daysInWeek = [
  'Thứ hai',
  'Thứ ba',
  'Thứ tư',
  'Thứ năm',
  'Thứ sáu',
  'Thứ bảy',
  'Chủ nhật',
];

export const DATE_FORMAT = 'DD/MM/YYYY';

export const convertStrToDate = (string, format = DATE_FORMAT) => {
  return moment(string, format);
};

export const convertDateToStr = (string, format = DATE_FORMAT) => {
  return moment(string).format(format).toString();
};

export const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export const renderDayMenu = (dayFilter = []) => dayFilter.map((dayIndex) => daysInWeek[dayIndex]);
