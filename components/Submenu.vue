<template>
  <div class="tabs-wrap">
    <ul class="tabs-nav" v-if="submenuData">
      <li v-if="submenuData.children" v-for="(item, index) in submenuData.children" :class="[submenuData.classes, {'active': item.active}]" :key="index">
        <nuxt-link :to="item.url" v-html="item.title"></nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      submenuData() {
        return this.$store.getters.getHeadingData(`/${this.$route.path.split('/')[1]}`);
      }
    }
  }
</script>
