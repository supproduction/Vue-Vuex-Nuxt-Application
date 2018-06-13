<template>
  <main :class="['content homepage', {'preloader': this.$store.state.preloader}]">
    <transition name="fade">
      <span class="preloader-circle" v-if="this.$store.state.preloader"><span></span></span>
    </transition>
    <transition name="fade">
      <div v-if="!this.$store.state.preloader">
      <Slider :items="$store.state.homePage['home_slider_artworks']" />
      <section class="collection-gallery-wrap">
        <div class="container">
          <h2>{{$store.state.homePage['home_collection_title']}}</h2>
          <ul class="collection-gallery">
            <li v-for="(item, key) in $store.state.homePage['home_collection_artworks']" :key="key">
              <div class="item">
                <figure>
                  <nuxt-link :to="item.link" :style="{'background-image': 'url('+item.img+')'}"></nuxt-link>
                </figure>
                <h4><nuxt-link :to="item.link" v-html="item.full_name"></nuxt-link></h4>
                <p>{{item.title}}</p>
                <span class="date">Date: {{item.date}}</span>
              </div>
            </li>
          </ul>
          <div class="more">
            <nuxt-link to="/artworks" class="btn">Browse All</nuxt-link>
          </div>
        </div>
      </section>
      <section class="artists-index">
        <div class="container">
          <h2>{{$store.state.homePage['home_artists_title']}}</h2>
          <div class="holder">
            <ul v-if="$store.state.homePage['home_artists']">
              <li v-for="(item, key) in $store.state.homePage['home_artists']['first_letters']" :key="key"><nuxt-link :to="item.link">{{item.letter}}</nuxt-link></li>
            </ul>
          </div>
          <div class="more">
            <nuxt-link to="/artists" class="btn">See All Artists</nuxt-link>
          </div>
        </div>
      </section>
      <!--/artists-index-->
      <section class="exhibitions">
        <div class="container">
          <h2>{{$store.state.homePage['home_exhibitions_title']}}</h2>
          <div class="posts">
            <div class="main-post">
              <div class="post" v-for="(item, index) in $store.state.homePage['home_exhibitions']" :key="index" v-if="index===1">
                <figure>
                  <nuxt-link :to="item.link" :style="{'background-image': 'url('+item.img+')'}"></nuxt-link>
                </figure>
                <div class="info">
                  <div class="date">{{item.start_date}} – {{item.end_date}}</div>
                  <h3><nuxt-link :to="item.link">{{item.title}}</nuxt-link></h3>
                  <h4>{{item.address}}</h4>
                </div>
              </div>
            </div>
            <div class="other-posts">
              <div class="post" v-for="(item, index) in $store.state.homePage['home_exhibitions']" :key="index" v-if="index!==1">
                <figure>
                  <nuxt-link :to="item.link" :style="{'background-image': 'url('+item.img+')'}"></nuxt-link>
                </figure>
                <div class="info">
                  <div class="date">{{item.start_date}} – {{item.end_date}}</div>
                  <h3><nuxt-link :to="item.link">{{item.title}}</nuxt-link></h3>
                  <h4>{{item.address}}</h4>
                </div>
              </div>
              <div class="more">
                <nuxt-link to="/exhibitions" class="btn">more Exhibitions</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--/exhibitions-->
      <section class="main-info">
        <div class="container">
          <div class="row">
            <div class="lap-4">
              <div class="about" v-html="$store.state.homePage['home_info_about_description']">
              </div>
              <div class="more">
                <nuxt-link to="/about-us/about-amma/" class="btn">Learn More</nuxt-link>
              </div>
            </div>
            <!--/about-->
            <div class="lap-4">
              <div class="news">
                <h3>{{$store.state.homePage['home_rss_news_title']}}</h3>
                <ul class="info-list">
                  <li v-for="(item, index) in $store.state.rss" :key="index" v-if="index <= 4">
                    <div class="date">{{item['month']}}<br>{{item['day']}}</div>
                    <div class="description">
                      <h4><a :href="item['link']">{{item['title']}}</a></h4>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="more">
                <nuxt-link to="news/" class="btn">More News</nuxt-link>
              </div>
            </div>
            <!--/news-->
            <div class="lap-4">
              <div class="associations">
                <h3>{{$store.state.homePage['home_info_sister_title']}}</h3>
                <ul class="info-list">
                  <li v-for="(item, index) in $store.state.homePage['home_info_sister_associations']" :key="index">
                    <div class="logo">
                      <img :src="item['home_info_sister_association_logo']['url']" alt="">
                    </div>
                    <div class="description">
                      <h4><a :href="item['home_info_sister_association_link']">{{item['home_info_sister_association_name']}}</a></h4>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="more">
                <nuxt-link to="about-us/sister-associations/" class="btn">See All</nuxt-link>
              </div>
            </div>
            <!--/associations-->
          </div>
        </div>
      </section>
      <!--/main-info-->
    </div>
    </transition>
  </main>
</template>


<script>
  import Slider from '~/components/Slider.vue'

  export default {
    components: {
      Slider
    },
    beforeCreate() {
      this.$store.state.preloader = true;
    },
    mounted() {
      this.$store.dispatch('getHomepage').then(() => {
        this.$store.state.preloader = false;
      });
      this.$store.dispatch('getRssNews');
    }
  }
</script>
