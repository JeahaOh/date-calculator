<template>
  <nav>
    <ul>
      <li>
        <a href="javascript:void(0);">{{ currentRouteName }}</a>
        <ul>
          <li v-for="(page, idx) in pages" :key="idx">
            <a :href="page.path">
              {{page.name}}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
import pages from '@/routes/routes.js';

export default {
  data() {
    return {
      pages
    }
  },
  computed: {
    currentRouteName() {
      const currentRouteName = this.$route.name;

      if (currentRouteName !== 'Page Not Found')
        return currentRouteName;
      else
        return '이동';
    }
  },
}
</script>