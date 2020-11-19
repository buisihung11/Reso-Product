export const PRODUCT_MASTER = 6;
export const PRODUCT_EXTRA = 5;
export const PRODUCT_DETAIL = 7;
export const PRODUCT_SINGLE = 0;
export const PRODUCT_COMBO = 1;
export const PRODUCT_COMPLEX = 10;

export const ARTICLE_HELLOBAR = 0;
export const ARTICLE_SLIDES = 1;
export const ARTICLE_STOREIS = 2;

export const ARTICLE_TYPE_DATA = [
  {
    value: ARTICLE_HELLOBAR,
    label: 'HelloBar',
  },
  {
    value: ARTICLE_SLIDES,
    label: 'Slides',
  },
  {
    value: ARTICLE_STOREIS,
    label: 'Stories',
  },
];

export const PRODUCT_TYPE_DATA = [
  {
    value: PRODUCT_MASTER,
    typeCode: 'master',
    label: 'SP Master',
  },
  {
    value: PRODUCT_COMPLEX,
    typeCode: 'complex',
    label: 'SP Kết hợp',
  },
  {
    value: PRODUCT_COMBO,
    typeCode: 'combo',
    label: 'SP Combo',
  },
  {
    value: PRODUCT_SINGLE,
    typeCode: 'single',
    label: 'SP Đơn',
  },
  {
    value: PRODUCT_EXTRA,
    typeCode: 'extra',
    label: 'SP Extra',
  },
];
