<template>
  <div>
    <div class="search-filter">
      <form class="artworks-filter" method="get" action="http://amma-test.bigdropinc.net/wp-json/wp/v2/artworks?_embed">
        <div class="filter-checkboxes">
          <label>Filter By Type</label>
          <ul>
            <li v-for="(type, index) in $store.state.dataFilters.types" :key="index">
              <CustomCheck :value="index" v-model="checkedTypes">{{type}}</CustomCheck>
            </li>
          </ul>
          <label>Show Only</label>
          <ul>
            <li>
              <CustomCheck :value="Object.keys($store.state.dataFilters)[1]" v-model="acquisition">
                {{$store.state.dataFilters["new-acquisition"]}}
              </CustomCheck>
            </li>
          </ul>
        </div>
        <div class="filter-selects">
          <label>Date</label>
          <div class="select-wrap">
            <Select :options="$store.state.dataFilters.artwork_year" v-model="selectedYear" />
          </div>
          <label>Sort By</label>
          <div class="select-wrap">
            <Select :options="$store.state.dataFilters.orderby" v-model="selectedOrder" />
          </div>
        </div>
      </form>
    </div>
    <div class="toolbar-sorting">
      <div class="items-showing" v-if="$store.state.artworksItems.headers">Showing: <span>{{$store.state.artworksItems.headers["x-wp-total"]}}</span> Works</div>
      <div class="sorting">Per page:
        <div class="select-wrap">
          <form class="per_page" method="get" action="http://amma-test.bigdropinc.net/artworks/">
            <Select :options="$store.state.dataFilters.per_page" v-model="checkedAmount" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Select from '~/components/Select.vue'
  import CustomCheck from '~/components/Custom-check.vue'

  export default {
    components: {
      Select,
      CustomCheck
    },
    data() {
      return {
        checkedTypes: this.$route.query.types ? this.$route.query.types.split(',') : [],
        checkedAmount: this.$route.query.per_page || '12',
        selectedYear: this.$route.query.artwork_year || 'all',
        selectedOrder: this.$route.query.orderby || 'default',
        acquisition: this.$route.query.acquisition === 'yes' ? true : false
      }
    },
    mounted() {
      this.$store.dispatch('getFilters');
    },
    watch: {
      '$route.query': function(query) {
        this.$store.state.preloader = true;
        this.$store.dispatch('getArtworks', query).then(() => {
          this.$store.state.preloader = false;
        });
      },
      checkedTypes: function (newVal) {
        let oldQuery = this.$route.query;
        delete oldQuery['page'];
        let typeValue = newVal.length !== 0 ? newVal.join(',') : newVal;
        let newQuery = {...oldQuery, types: typeValue};

        this.$router.push({ query: newQuery})
      },
      checkedAmount: function (newVal) {
        let oldQuery = this.$route.query;
        delete oldQuery['page'];
        let newQuery = {...oldQuery, per_page: newVal};

        this.$router.push({ query: newQuery});
      },
      selectedYear: function (newVal) {
        let oldQuery = this.$route.query;
        delete oldQuery['page'];
        let newQuery = {...oldQuery, artwork_year: newVal};

        this.$router.push({ query: newQuery});
      },
      selectedOrder: function (newVal) {
        let oldQuery = this.$route.query;
        delete oldQuery['page'];
        let newQuery = {...oldQuery, orderby: newVal};

        this.$router.push({ query: newQuery});
      },
      acquisition: function (newVal) {
        let oldQuery = this.$route.query;
        let value = newVal.toString() === 'false' ? 'no' : 'yes';
        delete oldQuery['page'];
        let newQuery = {...oldQuery, acquisition: value};

        this.$router.push({ query: newQuery});
      }
    }
  }
</script>
