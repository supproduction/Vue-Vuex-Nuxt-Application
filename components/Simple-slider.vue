<template>
  <div class="images-gallery">
    <slick ref="gallery" :options="slickOptions" class="images-slider" :slide="slide" :changed="changed" @beforeChange="handleBeforeChange">
      <div v-for="(item, key) in items" class="item" :key="key">
        <a :href="item.url"
           data-fancybox="gallery"
           :style="{'background-image': 'url('+item.url+')'}">
          <span class="zoom"></span>
        </a>
      </div>
    </slick>
  </div>
  <!--/images-gallery"-->
</template>


<script>
  let fancybox;
  if (process.browser) {
    fancybox = require('@fancyapps/fancybox');
  }
  import Slick from 'vue-slick'

  export default {
    components: {
      Slick
    },
    props: ['items', 'slide', 'changed'],
    data() {
      return {
        curSlide: 0,
        slickOptions: {
          speed: 200,
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          dots: true
        }
      };
    },
    beforeUpdate() {
      if (this.$refs.gallery && this.changed) {
        this.$refs.gallery.destroy();
      }
    },
    methods: {
      handleBeforeChange (event, slick, currentSlide, nextSlide) {
        this.curSlide = nextSlide;
        this.$emit('slideChange', nextSlide);
      }
    },
    updated() {
      if (this.$refs.gallery && !this.$refs.gallery.$el.classList.contains('slick-initialized') && this.changed) {
        this.$refs.gallery.create();
      }
      this.$refs.gallery.goTo(this.slide);
    }
  }
</script>
