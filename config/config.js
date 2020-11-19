// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  define: {
    API_BASE: 'http://54.151.235.125/api/v1',
  },
  locale: {
    // default zh-CN
    default: 'vi-VN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/product/list',
            },
            // PRODUCT
            {
              path: '/product',
              name: 'product',
              icon: 'project',
              routes: [
                {
                  path: '/',
                  redirect: '/product/list',
                },
                {
                  name: 'list',
                  icon: 'smile',
                  path: '/product/list',
                  component: './product/',
                },
                {
                  name: 'create',
                  path: '/product/create',
                  hideInMenu: true,
                  component: './product/create',
                },
                {
                  name: 'update',
                  path: '/product/update',
                  hideInMenu: true,
                  component: './product/update',
                },
                {
                  name: 'product-master',
                  icon: 'smile',
                  path: '/product/product-master',
                  component: './product/product-master',
                },
                {
                  name: 'product-master-create',
                  icon: 'smile',
                  path: '/product/product-master/create',
                  hideInMenu: true,
                  component: './product/create',
                },
              ],
            },
            // MENU
            {
              name: 'menu',
              icon: 'smile',
              path: '/menu',
              routes: [
                {
                  name: 'list',
                  icon: 'smile',
                  path: '/menu/list',
                  component: './menu/menu-list',
                },
                {
                  name: 'update',
                  hideInMenu: true,
                  path: '/menu/:updateId',
                  component: './menu/[updateId]',
                },
              ],
            },
            // HOME CONFIG
            {
              name: 'article',
              icon: 'read',
              path: '/article',
              routes: [
                {
                  name: 'list',
                  icon: 'read',
                  path: '/article/list',
                  component: './article',
                },
                {
                  name: 'create',
                  hideInMenu: true,
                  path: '/article/create',
                  component: './article/create',
                },
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
