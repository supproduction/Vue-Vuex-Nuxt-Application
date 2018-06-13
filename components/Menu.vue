<template>
  <ul class="main-nav">
    <li :class="[item.classes, {'menu-item-has-children': item.children}, {'current-menu-item': item.active}]" v-for="item in $store.state.dataItems" :key="item.id">
      <a :data-to="item.url" href="#" @click.prevent="expandMenu">{{item.title}}</a>
      <ul v-if="item.children">
        <li v-for="subtitem in item.children" :key="subtitem.id">
          <nuxt-link :to="subtitem.url" v-html="subtitem.title"></nuxt-link>
        </li>
      </ul>
    </li>
  </ul>
  <!--/main-nav-->
</template>

<script>
  import {toggleSlide, upSlide, downSlide} from '../plugins/includes/slidetoggle.js';
  export default {
    mounted() {
      this.$store.dispatch('getMenu');
      if(this.$store.state.isMobile || window.innerWidth < 1025) {
        this.resolutionTablet = true
      }
    },
    methods: {
      expandMenu(e) {
        let self = e.target;
        let item = self.closest('li');
        let content = item.querySelector('ul');

        if((this.$store.state.isMobile || window.innerWidth < 1025) && content !== null) {
          let container = self.closest('ul');
          let nodes = Array.prototype.slice.call(container.children);
          let indexItem = nodes.indexOf( item );

          container.querySelectorAll('li').forEach(subitem => {
            let indexElement = nodes.indexOf( subitem );
            let curConent = subitem.closest('li').querySelector('ul');

            if(curConent !== null) {
              if(indexItem !== indexElement) {

                subitem.classList.remove('active');
                upSlide(curConent, 300);
              } else {
                if (subitem.classList.contains('active')) {
                  subitem.classList.remove('active');
                  upSlide(curConent, 300);
                } else {
                  subitem.classList.add('active');
                  downSlide(curConent, 300);
                }
              }
            }
          });

        } if((!this.$store.state.isMobile || window.innerWidth >= 1025) && content === null) {
          this.$router.push(e.target.dataset.to);
        }
      }
    },
    watch: {
      '$route.path': function(path) {
        this.$store.commit('setMenuActive', path)
      }
    }
  }
</script>
