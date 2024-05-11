const routes = [
  {
    path: '/anni',
    name : '기념일 계산기',
    component: () => import('@/views/AnniversaryCalculator.vue'),
  },
  {
    path: '/addDate',
    name : '날짜 더하기 빼기 계산기',
    component: () => import('@/views/DateAddCalculator.vue'),
  },
  {
    path: '/dday',
    name : 'D-Day 계산기',
    component: () => import('@/views/DDayCalculator.vue'),
  },
  {
    path: '/period',
    name : '기간 계산기',
    component: () => import('@/views/PeriodCalculator.vue'),
  },
];

export default routes;