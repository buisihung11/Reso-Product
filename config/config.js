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
    API_BASE: 'https://5f62b7ce67e195001625f17c.mockapi.io/api',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
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
