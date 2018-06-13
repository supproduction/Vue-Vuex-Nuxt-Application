<template>
  <div class="pagination" v-if="$store.state.artworksItems.headers">
    <div class="wp-pagenavi">
      <a class="previouspostslink" rel="prev" href="" @click.prevent="pageClick(currentPage-1)" v-if="currentPage !== 1">prev</a>
      <a :class="['page smaller', {'current': currentPage === page}]" href="" v-for="page in artworksTotal" :key="page" @click.prevent="pageClick(page)">{{page}}</a>
      <a class="nextpostslink" rel="next" href="" @click.prevent="pageClick(currentPage+1)" v-if="currentPage !== artworksTotal">next</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: +this.$route.query.page || 1
      }
    },
    computed: {
      artworksTotal() {
        return +this.$store.state.artworksItems.headers['x-wp-totalpages']
      }
    },
    watch: {
      '$route.query': function (query) {
        this.$store.dispatch('getArtworks', query);
        this.currentPage = query.page || 1;
      }
    },
    methods: {
      pageClick(pageNumber) {
        let oldQuery = this.$route.query;
        let newQuery = {...oldQuery, page: pageNumber};

        this.$router.push({ query: newQuery});
      }
    }
  }
</script>
