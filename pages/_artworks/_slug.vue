<template>
  <main class="content">
    <div class="container">
      <div :class="['collection collection-inner', {'preloader': slugNotLoad}]">
        <h1>The Collection</h1>
        <Submenu />
        <transition name="fade">
          <div class="preloader-container" v-if="slugNotLoad">
            <span class="preloader-circle"><span></span></span>
          </div>
        </transition>
        <transition name="fade">
          <div class="artwork-details" v-show="!slugNotLoad">
            <div class="info-area">
              <!--<ul class="artworks-nav">-->
                <!--<li class="prev">-->
                  <!--<a href="#">-->
                    <!--<span>previous artwork</span>-->
                    <!--<div class="full-info">-->
                      <!--<em>Prev artwork</em>-->
                      <!--<figure style="background-image: url(dist/images/collection-1.jpg);"></figure>-->
                      <!--<span class="author">Philip Guston</span>-->
                      <!--<p>A Major Bequest of American Paintings</p>-->
                    <!--</div>-->
                  <!--</a>-->
                <!--</li>-->
                <!--<li class="next">-->
                  <!--<a href="#">-->
                    <!--<span>next artwork</span>-->
                    <!--<div class="full-info">-->
                      <!--<em>next artwork</em>-->
                      <!--<figure style="background-image: url(dist/images/collection-3.jpg);"></figure>-->
                      <!--<span class="author">Christopher Dressern</span>-->
                      <!--<p>Claret Pitcher</p>-->
                    <!--</div>-->
                  <!--</a>-->
                <!--</li>-->
              <!--</ul>-->
              <!--/artworks-nav-->
              <figure>
                <SimpleSlider :items="artwork['gallery']" :slide="slide" :changed="changed" @slideChange="changingSlider" />
              </figure>
              <div class="description">
                <div class="back"><nuxt-link to="/artworks" class="icon-left">Back to the list</nuxt-link></div>
                <div class="author" v-if="artwork['descr']">{{artwork['descr']['Artist']}}</div>
                <div class="artwork-category">
                  <div class="item" v-for="(item, key) in artwork['gallery']" :key="key">
                    <a href="#" :style="{'background-image': 'url('+item.small+')'}" @click.prevent="thumnail($event.target)"></a>
                  </div>
                </div>
                <!--/artwork-category-->
                <h2>{{artwork['title']}}</h2>
              </div>
              <div class="bottom-buttons">
                <a href="#" class="link more">Read More</a>
                <div class="share">
                  <a href="#" class="icon-share">Share</a>
                  <ul>
                    <li><a href="#" class="icon-facebook"></a></li>
                    <li><a href="#" class="icon-twitter"></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <!--/info-area-->
            <div class="artwork-overview info-area">
              <div class="artwork-table">
                <div class="table-line" v-for="(text, index) in artwork['descr']" :key="index">
                  <div class="title">{{index}}</div>
                  <div class="info">{{text}}</div>
                </div>
              </div>
              <!--/artwork-table-->
            </div>
            <!--/artwork-overview-->
          </div>
          <!--/artwork-details-->
        </transition>
      </div>
    </div>
  </main>
</template>


<script>
  import SimpleSlider from '~/components/Simple-slider.vue';
  import Submenu from '~/components/Submenu.vue';

  export default {
    components: {
      SimpleSlider,
      Submenu
    },
    data() {
      return {
        slugNotLoad: true,
        changed: true,
        slide: 0
      }
    },
    beforeMount() {
      this.slugNotLoad = true;
    },
    mounted() {
      this.$store.dispatch('getArtwork', this.$route.params.slug).then(() => {
        this.slugNotLoad = false;
        this.changed = false;
        document.querySelector('.artwork-category').querySelector('.item').classList.add('current');
      });
    },
    methods: {
      thumnail(e) {
        let container = e.closest('.artwork-category');
        let item = e.closest('.item');
        let nodes = Array.prototype.slice.call(container.children);
        let indexItem = nodes.indexOf( item );
        container.querySelectorAll('.item').forEach(item => {
          item.classList.remove('current');
        });
        item.classList.add('current');
        this.slide = indexItem;
      },
      changingSlider(e) {
        this.slide = e;
        let container = document.querySelector('.artwork-category');
        container.querySelectorAll('.item').forEach((item, index) => {
          if (index !== this.slide) {
            item.classList.remove('current');
          } else {
            item.classList.add('current');
          }
        });
      }
    },
    computed: {
      artwork() {
        return this.$store.state.artwork
      }
    },
  }
</script>
