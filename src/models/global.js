import { queryNotices } from '@/services/user';
import { getCategories } from '@/services/category';
const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    product_categories: [],
    brand_stores: [],
    current_store_id: null,
  },
  effects: {
    *fetchGlobalInfo(_, { call, put, select }) {
      const data = yield call(getCategories);
    },
    *changeCurrentStoreId({ payload }, { call, put, select }) {},

    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        (state) => state.global.notices.filter((item) => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },

    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select((state) => state.global.notices.length);
      const unreadCount = yield select(
        (state) => state.global.notices.filter((item) => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },

    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select((state) =>
        state.global.notices.map((item) => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter((item) => !item.read).length,
        },
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
    changeStore(state, { payload }) {
      return { ...state, current_store_id: payload };
    },
    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },

    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        ...state,
        collapsed: false,
        notices: state.notices.filter((item) => item.type !== payload),
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default GlobalModel;
