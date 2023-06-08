import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import axios from 'axios';


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      authRequired: false,
    },
    component: LoginView
  },
  {
    path: '/cms',
    name: 'CMS',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/CMSView.vue')
  }
  ,
  {
    path: '/cms/categories',
    name: 'Categories',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/CategoriesView.vue')
  },
  {
    path: '/cms/news/:categoryId',
    name: 'News',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/NewsViewCMS.vue')
  },
  {
    path: '/cms/news',
    name: 'AllNews',
    meta: {
      authRequired: true,
    },
    component: () => import('../views/NewsViewCMS.vue')
  },
  {
    path: '/cms/users',
    name: 'Users',
    meta: {
      authRequired: true,
      adminRequired: true
    },
    component: () => import('../views/UsersView.vue')
  },
  {
    path: '/news-platform',
    name: 'NewsPlatform',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/NewsPlatformView.vue')
  },
  {
    path: '/news-platform/home',
    name: 'NewsPlatformHome',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/news-platform/trending',
    name: 'NewsPlatformTrending',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/TrendingView.vue')
  },
  {
    path: '/news-platform/category/:categoryId',
    name: 'NewsPlatformNews',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/NewsViewNP.vue')
  },
  {
    path: '/news-platform/news/:newsId',
    name: 'NewsPlatformNewsDetails',
    meta: {
      authRequired: false,
    },
    component: () => import('../views/NewsDetailsView.vue')
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
