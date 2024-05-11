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
  setup() {},
  created() {
    console.log(this.pages);
  },
  mounted() {},
  unmounted() {},
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {}
}
</script>