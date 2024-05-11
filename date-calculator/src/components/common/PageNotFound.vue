<template>
  <section>
    <aside>
      Page Is Not Found.
    </aside>
  </section>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      location.href = '/';
    }, 3000);
  },
}
</script>