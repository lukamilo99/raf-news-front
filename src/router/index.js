import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('jwt')) {
        alert('Already logged in!')
        next(false);
      } else {
        next();
      }
    },
    meta: {
      authRequired: false,
    },
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'WelcomeView',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/WelcomeView.vue')
  },
  {
    path: '/cms',
    name: 'CMS',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/content_management_system/CMSView.vue')
  }
  ,
  {
    path: '/cms/categories',
    name: 'Categories',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/content_management_system/CategoriesView.vue')
  },
  {
    path: '/cms/news/:categoryId',
    name: 'News',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/content_management_system/NewsViewCMS.vue')
  },
  {
    path: '/cms/news',
    name: 'AllNews',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/content_management_system/NewsViewCMS.vue')
  },
  {
    path: '/cms/users',
    name: 'Users',
    meta: {
      authRequired: true,
      adminRequired: true
    },
    component: () => import('../views/content_management_system/UsersView.vue')
  },
  {
    path: '/news-platform',
    name: 'NewsPlatform',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/news_platform/NewsPlatformView.vue')
  },
  {
    path: '/news-platform/home',
    name: 'NewsPlatformHome',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/news_platform/HomeView.vue')
  },
  {
    path: '/news-platform/trending',
    name: 'NewsPlatformTrending',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/news_platform/TrendingView.vue')
  },
  {
    path: '/news-platform/category/:categoryId',
    name: 'NewsPlatformNews',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/news_platform/NewsViewNP.vue')
  },
  {
    path: '/news-platform/news/:newsId',
    name: 'NewsPlatformNewsDetails',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/news_platform/NewsDetailsView.vue')
  },
  {
    path: '/news-platform/tag/:tagId',
    name: 'NewsPlatformTags',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/news_platform/TagView.vue')
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/AccessDenied.vue')
  }
]

const router = new VueRouter({
  routes
})
import jwt_decode from "jwt-decode";
router.beforeEach((to, from, next) => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    const decodedJwt = jwt_decode(jwt);
    if (to.meta.adminRequired && decodedJwt.role !== 'ADMIN') {
      next({ name: 'AccessDenied' });
    }
  }
  if (to.meta.authRequired && !jwt) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router
