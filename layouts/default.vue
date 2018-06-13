<template>
  <div class="wrapper" style="opacity: 1;">
    <Header />
    <nuxt/>
    <Footer />
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'

  export default {
    components: {
      Header,
      Footer
    },
    mounted() {
      this.$store.commit('isMobileTest');
    }
  }
</script>
