const routes = [
  {
    path: '/period',
    name : '기간',
    component: () => import('@/views/PeriodCalculator.vue'),
  },
  {
    path: '/anni',
    name : '기념일',
    component: () => import('@/views/AnniversaryCalculator.vue'),
  },
  {
    path: '/addDate',
    name : '날짜 더하기 빼기',
    component: () => import('@/views/DateAddCalculator.vue'),
  },
  {
    path: '/dday',
    name : 'D-Day',
    component: () => import('@/views/DDayCalculator.vue'),
  },
];

export default routes;