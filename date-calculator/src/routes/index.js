import {createRouter, createWebHistory} from 'vue-router';
import originRoutes from './routes.js';

const routes = [
  {
    path: '/',
    redirect : '/anni'
  },
  {
    path: '/404',
    name: 'Page Not Found',
    component: () => import('@/components/common/PageNotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  ... originRoutes
];

const router = createRouter({
  history : createWebHistory(),
  routes
});

export default router;