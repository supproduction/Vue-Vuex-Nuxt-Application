<template>
  <main class="content">
    <div class="container">
      <div :class="['collection', {'preloader': this.$store.state.preloader}]">
        <h1>The Collection</h1>
        <Submenu />
        <h2>Artworks</h2>
        <FilterMenu />
        <Collections />
        <Pagination />
      </div>
    </div>
  </main>
</template>


<script>
  import Submenu from '~/components/Submenu.vue'
  import FilterMenu from '~/components/Filter.vue'
  import Collections from '~/components/Collections.vue'
  import Pagination from '~/components/Pagination.vue'

  export default {
    components: {
      Submenu,
      FilterMenu,
      Collections,
      Pagination
    }
  }
</script>
