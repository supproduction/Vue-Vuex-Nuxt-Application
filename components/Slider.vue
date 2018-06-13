<template>
  <section class="main-gallery-wrap">
    <slick ref="slick" :options="slickOptions" class="big-slider">
      <div v-for="(item, key) in items" class="item" :key="key">
        <div class="holder">
          <div class="info">
            <div class="date">{{item.date}}</div>
            <div class="author" v-html="`by ${item.full_name}. ${item.title}`"></div>
          </div>
          <div class="page-bg" :style="{'background-image': 'url('+item.img+')'}"></div>
        </div>
      </div>
    </slick>
  </section>
  <!--/main-gallery-->
</template>


<script>
  import Slick from 'vue-slick'

  export default {
    components: {
      Slick
    },
    props: ['items'],
    data() {
      return {
        slickOptions: {
          autoplay: true,
          slidesToShow: 1,
          dots: true,
          draggable: false
        }
      };
    },
    beforeUpdate() {
      if (this.$refs.slick) {
        this.$refs.slick.destroy();
      }
    },
    updated() {
      if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
        this.$refs.slick.create();
      }
    }
  }
</script>
