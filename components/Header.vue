<template>
  <header :class="['header_', {'scrolled': scrolledFlag}]">
    <div class="header-area">
      <strong class="logo"><nuxt-link to="/">Amma Foundacion</nuxt-link></strong>
      <!--/logo-->
      <a href="#" @click.prevent="burgerClick" :class="['btn-menu', {'btn-open': menuFlag}]"><span></span></a>
      <!--/btn-menu-->
      <nav class="main-menu">
        <div :class="['lang-switcher', {'opened': langFlag}]" ref="dropdownMenu">
          <a href="#" @click.prevent="langFlag = !langFlag">En</a>
          <transition
            name="fade-test"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
            v-on:after-leave="afterLeave"
            v-bind:css="false"
          >
            <ul v-if="langFlag">
              <li><a href="#">En</a></li>
              <li><a href="#">Es</a></li>
            </ul>
          </transition>
        </div>
        <!--/lang-switcher-->
        <div class="inner">
          <Menu />
        </div>
        <!--/inner-->
      </nav>
      <!--/main-menu-->
      <div class="header-search">
        <span @click="searchClick()" v-if="!searchFlag" class="icon-search">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 21 16" style="enable-background:new 0 0 21 16;" xml:space="preserve">
                <style type="text/css">
                    .st0 {
                      fill: #434A54;
                    }
                </style>
                <path class="st0" d="M9.3,0.8C6.3-0.9,2.5,0.1,0.8,3.1S0.1,10,3.1,11.7c2.6,1.5,5.9,0.9,7.8-1.4l1.5,0.9c-0.2,0.5-0.1,1,0.4,1.3
                    l5.7,3.3c0.5,0.3,1.1,0.1,1.4-0.4l1.1-1.8c0.3-0.5,0.1-1.1-0.4-1.4l-5.7-3.3c-0.5-0.3-1-0.1-1.3,0.3L12,8.3C13,5.6,11.9,2.4,9.3,0.8
                    z M3.4,11.1c-2.6-1.5-3.5-5-2-7.6s4.9-3.6,7.5-2s3.5,5,2,7.6S6,12.6,3.4,11.1z M14.5,9.5l5.7,3.3c0.2,0.1,0.2,0.3,0.1,0.5l-1.1,1.8
                    c-0.1,0.2-0.3,0.2-0.5,0.1L13.1,12c-0.2-0.1-0.2-0.3-0.1-0.5L14,9.6C14.1,9.5,14.3,9.4,14.5,9.5z M13.2,9.8l-0.5,0.8l-1.4-0.8
                    c0.1-0.1,0.2-0.3,0.3-0.4c0.1-0.1,0.1-0.3,0.2-0.4L13.2,9.8z"/>
                </svg>
            </span v-ig>
        <transition
          name="fade-test"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
          v-on:after-leave="afterLeave"
        >
        <div class="search-inner" v-if="searchFlag">
          <span class="close" @click="searchClick()"></span>
          <div class="search-form">
            <form>
              <div class="form-area">
                <input type="text" class="form-control"
                       placeholder="Search by keyword, title, artist, object number, or gallery number">
                <button type="submit" class="btn-submit">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 21 16" style="enable-background:new 0 0 21 16;" xml:space="preserve">
                            <style type="text/css">
                                .st0 {
                                  fill: #434A54;
                                }
                            </style>
                            <path class="st0" d="M9.3,0.8C6.3-0.9,2.5,0.1,0.8,3.1S0.1,10,3.1,11.7c2.6,1.5,5.9,0.9,7.8-1.4l1.5,0.9c-0.2,0.5-0.1,1,0.4,1.3
                                l5.7,3.3c0.5,0.3,1.1,0.1,1.4-0.4l1.1-1.8c0.3-0.5,0.1-1.1-0.4-1.4l-5.7-3.3c-0.5-0.3-1-0.1-1.3,0.3L12,8.3C13,5.6,11.9,2.4,9.3,0.8
                                z M3.4,11.1c-2.6-1.5-3.5-5-2-7.6s4.9-3.6,7.5-2s3.5,5,2,7.6S6,12.6,3.4,11.1z M14.5,9.5l5.7,3.3c0.2,0.1,0.2,0.3,0.1,0.5l-1.1,1.8
                                c-0.1,0.2-0.3,0.2-0.5,0.1L13.1,12c-0.2-0.1-0.2-0.3-0.1-0.5L14,9.6C14.1,9.5,14.3,9.4,14.5,9.5z M13.2,9.8l-0.5,0.8l-1.4-0.8
                                c0.1-0.1,0.2-0.3,0.3-0.4c0.1-0.1,0.1-0.3,0.2-0.4L13.2,9.8z"/>
                            </svg>
                </button>
              </div>
            </form>
          </div>
          <!--/search-form-->
        </div>
        </transition>
      </div>
      <!--/header-search-->
    </div>
  </header>
  <!--/header-->
</template>

<script>
  let Velocity;
  if (process.browser) {
    Velocity = require('velocity-animate')
  }
  import Menu from '~/components/Menu.vue';
  export default {
    data() {
      return {
        langFlag: false,
        searchFlag: false,
        menuFlag: false,
        scrolledFlag: false,
        height: 0
      }
    },
    components: {
      Menu
    },
    methods: {
      beforeEnter: function (el) {
        el.style.position = 'fixed';
        el.style.visibility = 'hidden';
        el.style.display = 'block';
        el.style.overflowY = 'hidden';
      },
      enter: function (el) {
        this.height = el.offsetHeight;
        el.style.display = 'block';
        el.style.position = '';
        el.style.visibility = '';
        el.style.height = '0';
        setTimeout(() => {
          el.style.height = this.height + 'px';
        }, 10)
      },
      leave: function(el, done) {
        el.style.height = '0';
      },
      afterLeave: function (el) {
        el.style.height = '';
      },
      burgerClick() {
        this.menuFlag = !this.menuFlag;
        if (this.menuFlag) {
          Velocity(document.querySelector('.main-menu'), 'slideDown', {duration: 500});
        } else {
          Velocity(document.querySelector('.main-menu'), 'slideUp', {duration: 500});
        }
        if(this.$store.state.isMobile || window.innerWidth < 1200) {
          document.body.classList.toggle("no-scroll");
        }
      },
      searchClick() {
        this.searchFlag = !this.searchFlag;
        document.body.classList.toggle("no-scroll");
      },
      documentClick(e) {
        let el = this.$refs.dropdownMenu;
        let target = e.target;
        if ( (el !== target) && !el.contains(target)) {
          this.langFlag=false
        }
      },
      headerActivities() {
        if(!this.$store.state.isMobile || window.innerWidth >= 1025) {
          this.scrolledFlag = window.scrollY > 0 ? true : false;
        }
      }
    },
    beforeMount () {
     document.addEventListener('click', this.documentClick);
     document.addEventListener('scroll', this.headerActivities);
    },
    destroyed () {
     document.removeEventListener('click', this.documentClick);
     document.removeEventListener('scroll', this.headerActivities);
    }
  }
</script>
