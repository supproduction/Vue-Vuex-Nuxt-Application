<template>
  <div class="collection-wrap">
      <ul class="collection-gallery">
        <li v-for="item in $store.state.artworksItems.data" :key="item.id">
          <div class="item">
            <figure>
              <nuxt-link :to="item.link" :style="`background-image: url(${item.image})`"></nuxt-link>
            </figure>
            <h3>
              <a>{{item.artist}}</a>
            </h3>
            <h4>
              <nuxt-link :to="item.link" v-html="item.title"></nuxt-link>
            </h4>
            <span class="date">{{item.year}}</span>
            <span class="category">{{item.category}}</span>
          </div>
        </li>
      </ul>
      <span class="preloader-circle"><span></span></span>
    </div>
</template>


<script>
  export default {
    beforeMount() {
      this.$store.state.preloader = true;
    },
    mounted() {
      this.$store.dispatch('getArtworks').then(() => {
        this.$store.state.preloader = false;
      });
    }
  }
</script>
