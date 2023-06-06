import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import axios from 'axios';


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    authRequired: false,
    component: LoginView
  },
  {
    path: '/cms',
    name: 'CMS',
    authRequired: true,
    component: () => import('../views/CMSView.vue')
  }
  ,
  {
    path: '/cms/categories',
    name: 'Categories',
    authRequired: true,
    component: () => import('../views/CategoriesView.vue')
  }
  ,
  {
    path: 'cms/news/:categoryId',
    name: 'News',
    authRequired: true,
    component: () => import('../views/NewsView.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.authRequired) {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      next({name: 'Login'});
      return;
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
  }
  next();
});

export default router
